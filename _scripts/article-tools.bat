@echo off
setlocal enabledelayedexpansion

REM Article management tools for Hidden Crucials
REM Usage: article-tools.bat [command] [options]

if "%1"=="" goto :help

if "%1"=="help" goto :help
if "%1"=="new" goto :new_article
if "%1"=="list" goto :list_articles
if "%1"=="stats" goto :show_stats
if "%1"=="backup" goto :backup_articles
if "%1"=="preview" goto :preview_site
if "%1"=="deploy" goto :deploy_site

:help
echo.
echo ═══════════════════════════════════════
echo   Hidden Crucials Article Tools
echo ═══════════════════════════════════════
echo.
echo Commands:
echo   new [title] [category]    Create new article
echo   list                      List all articles
echo   stats                     Show article statistics
echo   backup                    Backup all articles
echo   preview                   Preview site locally
echo   deploy                    Deploy to GitHub Pages
echo   help                      Show this help
echo.
echo Categories:
echo   digital-wisdom            Digital Wisdom articles
echo   cognitive-frameworks      Cognitive Frameworks articles
echo   personal-systems          Personal Systems articles
echo   social-dynamics           Social Dynamics articles
echo.
echo Examples:
echo   article-tools new "My Article" digital-wisdom
echo   article-tools list
echo   article-tools preview
echo.
exit /b 0

:new_article
if "%~2"=="" (
    echo Error: Article title required
    echo Usage: article-tools new "Article Title" [category]
    exit /b 1
)
call _scripts\new-article.bat "%~2" "%~3"
exit /b 0

:list_articles
echo.
echo ═══════════════════════════════════════
echo   All Articles
echo ═══════════════════════════════════════
echo.
for /r "_articles" %%f in (*.md) do (
    if not "%%~nxf"=="README.md" (
        echo %%~nxf
    )
)
echo.
exit /b 0

:show_stats
echo.
echo ═══════════════════════════════════════
echo   Article Statistics
echo ═══════════════════════════════════════
echo.

set /a total_articles=0
set /a digital_wisdom=0
set /a cognitive_frameworks=0
set /a personal_systems=0
set /a social_dynamics=0

for /r "_articles\digital-wisdom" %%f in (*.md) do (
    set /a digital_wisdom+=1
    set /a total_articles+=1
)

for /r "_articles\cognitive-frameworks" %%f in (*.md) do (
    set /a cognitive_frameworks+=1
    set /a total_articles+=1
)

for /r "_articles\personal-systems" %%f in (*.md) do (
    set /a personal_systems+=1
    set /a total_articles+=1
)

for /r "_articles\social-dynamics" %%f in (*.md) do (
    set /a social_dynamics+=1
    set /a total_articles+=1
)

echo Total Articles: !total_articles!
echo.
echo By Category:
echo   Digital Wisdom: !digital_wisdom!
echo   Cognitive Frameworks: !cognitive_frameworks!
echo   Personal Systems: !personal_systems!
echo   Social Dynamics: !social_dynamics!
echo.
exit /b 0

:backup_articles
set backup_name=articles_backup_%date:~-4,4%_%date:~-10,2%_%date:~-7,2%_%time:~0,2%_%time:~3,2%_%time:~6,2%
set backup_name=%backup_name: =0%
echo Creating backup: %backup_name%.zip
powershell -command "Compress-Archive -Path '_articles' -DestinationPath '%backup_name%.zip' -Force"
echo Backup created successfully: %backup_name%.zip
exit /b 0

:preview_site
echo Starting local preview...
echo Open http://localhost:4000 in your browser
echo Press Ctrl+C to stop
if exist Gemfile (
    bundle exec jekyll serve --host 0.0.0.0 --port 4000 --livereload
) else (
    jekyll serve --host 0.0.0.0 --port 4000 --livereload
)
exit /b 0

:deploy_site
echo.
echo Deploying to GitHub Pages...
echo.
git add .
git status
echo.
set /p commit_msg="Enter commit message (or press Enter for default): "
if "!commit_msg!"=="" set commit_msg=Update articles and content

git commit -m "!commit_msg!"
git push origin main
echo.
echo Deployment completed!
echo Your site will be available at: https://farkhanmaul.github.io/hidden-crucials/
echo.
exit /b 0