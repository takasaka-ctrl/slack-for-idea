---
name: mcp-tools
description: Access MCP servers (GitHub, PixelLab, Filesystem) via mcporter. Call tools from MCP servers to interact with external services and APIs.
---

# MCP Tools

Use this skill to interact with Model Context Protocol (MCP) servers configured via mcporter.

## Available MCP Servers

### GitHub (40 tools)
- Issues/PRs: create, update, comment, review
- Repository: files, branches, commits, releases
- Code: search, analyze, fetch contents
- CI/CD: workflows, actions

### PixelLab (19 tools)
- `create_character()` - Generate 4/8-directional pixel art characters
- `animate_character()` - Add animations (walk, run, idle, etc.)
- `create_tileset()` - Generate Wang tilesets
- `create_isometric_tile()` - Create isometric tiles
- `get_character()` - Check job status and download

### Filesystem (14 tools)
- Read/write files in `/mnt/vault` and `/home/node/.openclaw/workspace`
- Directory operations
- File search

## How to Use

### List Available Tools

```bash
cd /home/node/.openclaw/workspace/tools && npx mcporter list
```

### List Specific Server Tools

```bash
cd /home/node/.openclaw/workspace/tools && npx mcporter list pixellab --schema
```

### Call a Tool

**Colon-delimited style:**
```bash
cd /home/node/.openclaw/workspace/tools && npx mcporter call pixellab.create_character description:"cute wizard" n_directions:4
```

**Function-call style:**
```bash
cd /home/node/.openclaw/workspace/tools && npx mcporter call 'github.get_file_contents(owner: "takasaka-ctrl", repo: "slack-for-idea", path: "README.md")'
```

**JSON args:**
```bash
cd /home/node/.openclaw/workspace/tools && npx mcporter call pixellab.create_character --args '{"description":"cute wizard","n_directions":4}'
```

### Get Tool Schema

```bash
cd /home/node/.openclaw/workspace/tools && npx mcporter list github.get_file_contents
```

## Configuration

MCP servers are configured in `/home/node/.mcporter/mcporter.json`:

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "Bearer ${GITHUB_TOKEN}"
      }
    },
    "pixellab": {
      "type": "http",
      "url": "https://api.pixellab.ai/mcp",
      "headers": {
        "Authorization": "Bearer ${PIXELLAB_API_KEY}"
      }
    },
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/mnt/vault", "/home/node/.openclaw/workspace"]
    }
  }
}
```

Environment variables are automatically resolved:
- `GITHUB_TOKEN` - GitHub Personal Access Token
- `PIXELLAB_API_KEY` - PixelLab API key

## Tips

- Always `cd /home/node/.openclaw/workspace/tools` before running mcporter (node_modules location)
- Use `--output json` for machine-readable output
- Check job status with `get_character(character_id: "...")` for async operations
- Use `exec` tool to run mcporter commands from OpenClaw

## Example: Create Pixel Art Character

```bash
cd /home/node/.openclaw/workspace/tools && npx mcporter call pixellab.create_character description:"small mage with purple robe and staff" n_directions:4 size:64 --output json
```

This returns a job ID. Check status with:

```bash
cd /home/node/.openclaw/workspace/tools && npx mcporter call pixellab.get_character character_id:"YOUR_CHARACTER_ID" --output json
```
