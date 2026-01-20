#!/bin/bash
# Diagnóstico de estado de git
cd /Users/webnorka/DESARROLLO/nuevaespweb

echo "=== GIT STATUS ===" > /Users/webnorka/DESARROLLO/nuevaespweb/git_diagnostic.log
git status >> /Users/webnorka/DESARROLLO/nuevaespweb/git_diagnostic.log 2>&1

echo "" >> /Users/webnorka/DESARROLLO/nuevaespweb/git_diagnostic.log
echo "=== GIT DIFF STAT ===" >> /Users/webnorka/DESARROLLO/nuevaespweb/git_diagnostic.log
git diff --stat >> /Users/webnorka/DESARROLLO/nuevaespweb/git_diagnostic.log 2>&1

echo "" >> /Users/webnorka/DESARROLLO/nuevaespweb/git_diagnostic.log
echo "=== GIT LOG ===" >> /Users/webnorka/DESARROLLO/nuevaespweb/git_diagnostic.log  
git log --oneline -5 >> /Users/webnorka/DESARROLLO/nuevaespweb/git_diagnostic.log 2>&1

echo "" >> /Users/webnorka/DESARROLLO/nuevaespweb/git_diagnostic.log
echo "=== UNTRACKED FILES ===" >> /Users/webnorka/DESARROLLO/nuevaespweb/git_diagnostic.log
git ls-files --others --exclude-standard >> /Users/webnorka/DESARROLLO/nuevaespweb/git_diagnostic.log 2>&1

echo "Diagnostic complete! Check git_diagnostic.log"
