@echo off
setlocal enabledelayedexpansion

REM Script to create new article with template
REM Usage: new-article.bat "Article Title" category

if "%~1"=="" (
    echo Usage: new-article.bat "Article Title" [category]
    echo Categories: digital-wisdom, cognitive-frameworks, personal-systems, social-dynamics
    exit /b 1
)

set "title=%~1"
set "category=%~2"

REM Default category if not provided
if "%category%"=="" set "category=digital-wisdom"

REM Convert title to filename (simple kebab-case)
set "filename=%title: =-%"
set "filename=%filename:"=%"
for %%i in (A B C D E F G H I J K L M N O P Q R S T U V W X Y Z) do set "filename=!filename:%%i=%%i!"
for %%i in (A B C D E F G H I J K L M N O P Q R S T U V W X Y Z) do (
    set "lower=%%i"
    call set "filename=%%filename:%%%%i=%%%%lower%%%%"
)

REM Get current date
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "current_date=%dt:~0,4%-%dt:~4,2%-%dt:~6,2%"

REM Create article file
set "article_path=_articles\%category%\%filename%.md"

echo Creating article: %article_path%

(
echo ---
echo layout: docs
echo title: "%title%"
echo description: "Brief description of the article (max 160 characters)"
echo category: "%category%"
echo date: %current_date%
echo tags: [tag1, tag2, tag3]
echo author: "Hidden Crucials"
echo reading_time: 5
echo featured: false
echo ---
echo.
echo # %title%
echo.
echo *Brief subtitle or introduction*
echo.
echo Your article content starts here...
echo.
echo ## Section Heading
echo.
echo Content for this section.
echo.
echo ### Subsection
echo.
echo More detailed content.
echo.
echo {:.callout .callout-info}
echo **Tip**: Use callouts to highlight important information.
echo.
echo ## Practical Implementation
echo.
echo Actionable steps or examples.
echo.
echo {:.text-center}
echo *"Quote or key insight that deserves emphasis"*
echo.
echo ---
echo.
echo **Next Steps**: What should the reader do after reading this article?
) > "%article_path%"

echo Article created successfully: %article_path%
echo.
echo Next steps:
echo 1. Edit the article content in your favorite editor
echo 2. Update the description, tags, and reading_time
echo 3. Preview with: bundle exec jekyll serve
echo 4. Publish with: git add . ^&^& git commit -m "Add: %title%" ^&^& git push
echo.
pause