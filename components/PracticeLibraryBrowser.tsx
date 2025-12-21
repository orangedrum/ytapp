import { useState, useMemo } from "react";
import { useVideosWithTaxonomy, useVideoCategories, useVideoLevels, useVideoRoles, useVideoTypes } from "@/hooks/useCurriculum";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Sparkles, Target, Filter, X } from "lucide-react";
import { ScheduleVideoSheet } from "@/components/ScheduleVideoSheet";
import { useAuth } from "@/components/AuthProvider";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

export const PracticeLibraryBrowser = () => {
  const { user } = useAuth();
  const { data: profile } = useUserProfile(user?.id);
  const isMobile = useIsMobile();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [scheduleSheetOpen, setScheduleSheetOpen] = useState(false);
  const [selectedVideoForSchedule, setSelectedVideoForSchedule] = useState<{ id: string; title: string } | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: categories = [] } = useVideoCategories();
  const { data: levels = [] } = useVideoLevels();
  const { data: roles = [] } = useVideoRoles();
  const { data: types = [] } = useVideoTypes();
  
  // Find the level ID that matches user's skill level
  const userLevelId = useMemo(() => {
    if (!profile?.skill_level) return undefined;
    const matchingLevel = levels.find(
      level => level.name.toLowerCase() === profile.skill_level?.toLowerCase()
    );
    return matchingLevel?.id;
  }, [profile?.skill_level, levels]);

  // Find role ID that matches user's dance role
  const userRoleId = useMemo(() => {
    if (!profile?.dance_role) return undefined;
    const matchingRole = roles.find(
      role => role.name.toLowerCase() === profile.dance_role?.toLowerCase() || role.name.toLowerCase() === 'both'
    );
    return matchingRole?.id;
  }, [profile?.dance_role, roles]);

  const { data: videos = [], isLoading } = useVideosWithTaxonomy({
    categoryIds: selectedCategories.length > 0 ? selectedCategories : undefined,
    levelIds: selectedLevels.length > 0 
      ? selectedLevels 
      : userLevelId ? [userLevelId] : undefined,
    roleIds: selectedRoles.length > 0 
      ? selectedRoles 
      : userRoleId ? [userRoleId] : undefined,
    typeIds: selectedTypes.length > 0 ? selectedTypes : undefined,
  });

  const filteredVideos = videos
    .filter(video => 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 6); // Show only first 6 videos

  const hasUserPreferences = profile?.dance_role && profile?.skill_level;

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "Unknown";
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const handleScheduleVideo = (videoId: string, videoTitle: string) => {
    setSelectedVideoForSchedule({ id: videoId, title: videoTitle });
    setScheduleSheetOpen(true);
  };

  const activeFilterCount = [selectedCategories, selectedLevels, selectedRoles, selectedTypes]
    .filter(arr => arr.length > 0).length;

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedRoles([]);
    setSelectedTypes([]);
  };

  const FilterSection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Filters</h3>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select
          value={selectedCategories[0] || "all"}
          onValueChange={(value) => setSelectedCategories(value === "all" ? [] : [value])}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat: any) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedLevels[0] || "all"}
          onValueChange={(value) => setSelectedLevels(value === "all" ? [] : [value])}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {levels.map((level: any) => (
              <SelectItem key={level.id} value={level.id}>
                {level.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedRoles[0] || "all"}
          onValueChange={(value) => setSelectedRoles(value === "all" ? [] : [value])}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map((role: any) => (
              <SelectItem key={role.id} value={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedTypes[0] || "all"}
          onValueChange={(value) => setSelectedTypes(value === "all" ? [] : [value])}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {types.map((type: any) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-8 bg-muted rounded w-1/3"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded"></div>
        ))}
      </div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="flex flex-col gap-4">
        {hasUserPreferences && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-primary font-semibold">✨ Suggested for You</span>
            <span>•</span>
            <span>Based on your {profile?.dance_role} role and {profile?.skill_level} level</span>
          </div>
        )}
        
        <div className="flex gap-2">
          <Input
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          
          {/* Filter Toggle */}
          {isMobile ? (
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 relative">
                  <Filter className="h-4 w-4" />
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filter Videos</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 pb-8">
                  <FilterSection />
                </div>
                <div className="p-4 border-t">
                  <DrawerClose asChild>
                    <Button className="w-full">Apply Filters</Button>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <Button
              variant="outline"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="gap-2 shrink-0"
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Desktop Collapsible Filters */}
      {!isMobile && (
        <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
          <CollapsibleContent className="border rounded-lg p-4">
            <FilterSection />
          </CollapsibleContent>
        </Collapsible>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4">
              <div className="flex gap-3">
                {video.thumbnail_url && (
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm line-clamp-2">{video.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {formatDuration(video.duration)}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 pt-0">
              <div className="flex flex-wrap gap-1 mb-3">
                {video.video_level_mappings?.slice(0, 1).map((mapping: any) => (
                  mapping.video_levels && (
                    <Badge key={mapping.video_levels.id} variant="outline" className="text-xs">
                      {mapping.video_levels.name}
                    </Badge>
                  )
                ))}
                {video.video_role_mappings?.slice(0, 1).map((mapping: any) => (
                  mapping.video_roles && (
                    <Badge key={mapping.video_roles.id} variant="secondary" className="text-xs bg-accent/20 text-accent">
                      <Target className="w-3 h-3 mr-1" />
                      For {mapping.video_roles.name}
                    </Badge>
                  )
                ))}
                {video.video_type_mappings?.slice(0, 1).map((mapping: any) => (
                  mapping.video_types && (
                    <Badge key={mapping.video_types.id} variant="default" className="text-xs">
                      {mapping.video_types.name}
                    </Badge>
                  )
                ))}
              </div>
              
              {user && (
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleScheduleVideo(video.id, video.title)}
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  Schedule Practice
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No videos found matching your criteria.
        </div>
      )}

      {selectedVideoForSchedule && (
        <ScheduleVideoSheet
          open={scheduleSheetOpen}
          onOpenChange={setScheduleSheetOpen}
          videoId={selectedVideoForSchedule.id}
          videoTitle={selectedVideoForSchedule.title}
        />
      )}
    </div>
  );
};
