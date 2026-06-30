$AgencyRepo = "D:\Study\Project\agency-agents"
$ProjectRoot = "D:\Study\Project\FinnUI\finn-ui-library"

$AgentFiles = @(
  "engineering/engineering-frontend-developer.md",
  "engineering/engineering-code-reviewer.md",
  "engineering/engineering-software-architect.md",
  "engineering/engineering-technical-writer.md",
  "design/design-ui-designer.md",
  "design/design-ux-architect.md"
)

$SkillRoot = Join-Path $ProjectRoot ".agents\skills"
New-Item -ItemType Directory -Force $SkillRoot | Out-Null

function Convert-ToSlug($value) {
  return ($value.ToLower() -replace '[^a-z0-9]+', '-' -replace '^-|-$', '')
}

function Get-FrontmatterValue($content, $key) {
  $pattern = "(?m)^\s*$key\s*:\s*[""']?(.+?)[""']?\s*$"
  $match = [regex]::Match($content, $pattern)

  if ($match.Success) {
    return $match.Groups[1].Value.Trim()
  }

  return $null
}

function Get-HeadingName($content) {
  $match = [regex]::Match($content, '(?m)^#\s+(.+)$')

  if ($match.Success) {
    return $match.Groups[1].Value.Trim()
  }

  return $null
}

function Remove-OriginalFrontmatter($content) {
  return [regex]::Replace($content, '(?s)^---\s*.*?\s*---\s*', '').Trim()
}

foreach ($relativePath in $AgentFiles) {
  $sourcePath = Join-Path $AgencyRepo ($relativePath -replace '/', '\')

  if (!(Test-Path $sourcePath)) {
    Write-Warning "Not found: $sourcePath"
    continue
  }

  $content = Get-Content $sourcePath -Raw

  $agentName = Get-FrontmatterValue $content "name"

  if ([string]::IsNullOrWhiteSpace($agentName)) {
    $agentName = Get-HeadingName $content
  }

  if ([string]::IsNullOrWhiteSpace($agentName)) {
    $fileName = [System.IO.Path]::GetFileNameWithoutExtension($sourcePath)
    $agentName = $fileName
  }

  $description = Get-FrontmatterValue $content "description"

  if ([string]::IsNullOrWhiteSpace($description)) {
    $description = "Converted Agency Agents skill for $agentName."
  }

  $slug = "agency-" + (Convert-ToSlug $agentName)
  $body = Remove-OriginalFrontmatter $content

  $targetDir = Join-Path $SkillRoot $slug
  New-Item -ItemType Directory -Force $targetDir | Out-Null

  $skillContent = @"
---
name: $slug
description: $description
---

Converted from msitarzewski/agency-agents.

Original source: $relativePath

Original agent name: $agentName

$body
"@

  Set-Content -Path (Join-Path $targetDir "SKILL.md") -Value $skillContent -Encoding UTF8

  Write-Host "Created skill: $slug"
}

Write-Host ""
Write-Host "Done. Skills installed to:"
Write-Host $SkillRoot