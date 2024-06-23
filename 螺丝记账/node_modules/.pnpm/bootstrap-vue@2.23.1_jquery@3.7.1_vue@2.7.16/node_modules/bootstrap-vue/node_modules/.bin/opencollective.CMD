@SETLOCAL
@IF NOT DEFINED NODE_PATH (
  @SET "NODE_PATH=D:\螺丝记账\螺丝记账\螺丝记账\node_modules\.pnpm\@nuxt+opencollective@0.3.3\node_modules\@nuxt\opencollective\bin\node_modules;D:\螺丝记账\螺丝记账\螺丝记账\node_modules\.pnpm\@nuxt+opencollective@0.3.3\node_modules\@nuxt\opencollective\node_modules;D:\螺丝记账\螺丝记账\螺丝记账\node_modules\.pnpm\@nuxt+opencollective@0.3.3\node_modules\@nuxt\node_modules;D:\螺丝记账\螺丝记账\螺丝记账\node_modules\.pnpm\@nuxt+opencollective@0.3.3\node_modules;D:\螺丝记账\螺丝记账\螺丝记账\node_modules\.pnpm\node_modules"
) ELSE (
  @SET "NODE_PATH=D:\螺丝记账\螺丝记账\螺丝记账\node_modules\.pnpm\@nuxt+opencollective@0.3.3\node_modules\@nuxt\opencollective\bin\node_modules;D:\螺丝记账\螺丝记账\螺丝记账\node_modules\.pnpm\@nuxt+opencollective@0.3.3\node_modules\@nuxt\opencollective\node_modules;D:\螺丝记账\螺丝记账\螺丝记账\node_modules\.pnpm\@nuxt+opencollective@0.3.3\node_modules\@nuxt\node_modules;D:\螺丝记账\螺丝记账\螺丝记账\node_modules\.pnpm\@nuxt+opencollective@0.3.3\node_modules;D:\螺丝记账\螺丝记账\螺丝记账\node_modules\.pnpm\node_modules;%NODE_PATH%"
)
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\..\..\..\..\@nuxt+opencollective@0.3.3\node_modules\@nuxt\opencollective\bin\opencollective.js" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\..\..\..\..\@nuxt+opencollective@0.3.3\node_modules\@nuxt\opencollective\bin\opencollective.js" %*
)
