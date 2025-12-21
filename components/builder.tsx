--- a/components/builder.tsx
+++ b/components/builder.tsx
@@ -2,7 +2,6 @@
 import { ComponentProps } from "react";
 import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
 import { builder } from "@builder.io/sdk";
-import DefaultErrorPage from "next/error";
 
 type BuilderPageProps = ComponentProps<typeof BuilderComponent>;
 
@@ -17,5 +16,10 @@
   }
 
-  // If the "content" is null and the page is not being previewed in Builder,
-  // render the DefaultErrorPage with a 404.
-  return <DefaultErrorPage statusCode={404} />;
+  // If content is missing, show a success message so Builder can connect
+  return (
+    <div style={{ padding: 50, textAlign: "center" }}>
+      <h1>App Connected!</h1>
+      <p>Go back to Builder.io and create your page.</p>
+    </div>
+  );
 }
