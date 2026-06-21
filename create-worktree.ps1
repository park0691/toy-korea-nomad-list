param(
    [Parameter(Mandatory=$true)]
    [string]$Name
)

$WorktreePath = ".\worktree\$Name"

if (git worktree add $WorktreePath) {
    Write-Host "워크트리 생성 성공: $WorktreePath"
    Set-Location $WorktreePath
    Write-Host "디렉터리 변경 완료 $(Get-Location)"
    claude
} else {
    Write-Host "워크트리 생성에 실패했습니다."
    exit 1
}
