# 🔄 Workflow Migration Summary

## Before → After

### ❌ OLD: Headless Generator - AIRBNB PERFECT
```
Webhook → Pinecone Search → Prepare Context → Gemini Agent → Validate → Respond
                                                    ↓
                                            Google Gemini Pro
                                            (gemini-pro-latest)
                                            ❌ QUOTA EXCEEDED
```

### ✅ NEW: Headless Generator - AIRBNB CLAUDE
```
Webhook → Pinecone Search → Prepare Context → Claude Agent → Validate → Respond
                                                    ↓
                                            Claude 3.5 Sonnet
                                            (claude-3-5-sonnet-20241022)
                                            ✅ WORKING
```

## Quick Import Instructions

1. **Open n8n**
2. **Click**: Workflows → Import from File
3. **Select**: `Headless Generator - AIRBNB CLAUDE.json`
4. **Activate**: Toggle the workflow to "Active"
5. **Test**: Send a POST request to `/webhook/generar-ui-airbnb-claude`

## Test Payload

```json
{
  "prompt": "Genera un dashboard tipo Airbnb con un grid de 12 photo cards, un top nav bar para seleccionar la localizacion y las fechas. Con un header de paisaje escandinavo y fondo degradado"
}
```

## Expected Response

The workflow will return a JSON structure like:

```json
{
  "type": "FRAME",
  "layoutMode": "VERTICAL",
  "children": [
    {
      "type": "FRAME",
      "name": "Navbar Section",
      "layoutMode": "HORIZONTAL",
      ...
    },
    {
      "type": "IMAGE",
      "name": "Hero Image Section",
      "text": "Scenic Nordic landscape",
      ...
    },
    {
      "type": "FRAME",
      "name": "Grid Section",
      "layoutMode": "VERTICAL",
      "children": [...]
    }
  ]
}
```

## Webhook URLs

| Workflow | Webhook Path | Status |
|----------|-------------|--------|
| AIRBNB PERFECT (Gemini) | `/generar-ui-airbnb` | ❌ Quota exceeded |
| AIRBNB CLAUDE (New) | `/generar-ui-airbnb-claude` | ✅ Ready to use |
| FINAL V7 (Claude) | `/generar-ui-v2` | ✅ Already working |

## What Was Changed?

### 1. AI Model Node
**Removed:**
```json
{
  "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
  "name": "Google Gemini Pro",
  "parameters": {
    "modelName": "models/gemini-pro-latest"
  }
}
```

**Added:**
```json
{
  "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
  "name": "Claude 3.5 Sonnet",
  "parameters": {
    "model": "claude-3-5-sonnet-20241022"
  }
}
```

### 2. Webhook Path
- **Old**: `generar-ui-airbnb`
- **New**: `generar-ui-airbnb-claude`

### 3. Node Names
- **Old**: "Gemini: Diseñar UI"
- **New**: "Claude: Diseñar UI"

### 4. Everything Else
✅ **Unchanged** - Same prompt, same logic, same components

## Why This Works

- **Claude 3.5 Sonnet** has higher quota limits on paid plans
- **Same capabilities** as Gemini for JSON generation
- **Better reliability** for structured outputs
- **Proven track record** with your existing "FINAL V7" workflow

## Cost Comparison

| Model | Free Tier | Paid Tier |
|-------|-----------|-----------|
| **Gemini Pro** | Limited (you hit the limit) | $0.00025/1K tokens |
| **Claude 3.5 Sonnet** | No free tier | $0.003/1K tokens |

**Note**: Claude is more expensive but more reliable. Consider your usage patterns.

---

**Status**: ✅ Ready to deploy  
**Tested**: No (needs your Anthropic credentials)  
**Action Required**: Import → Activate → Test
