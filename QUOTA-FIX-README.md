# 🔧 Google Gemini Quota Error - Solution Guide

## 📋 Problem Summary

You encountered a **Google Gemini API quota exceeded error** when running your n8n workflow:

```
[429 Too Many Requests] You exceeded your current quota
- Daily input token limit exceeded
- Daily request limit exceeded  
- Per-minute request limit exceeded
```

## 🎯 Root Cause

Your **"Headless Generator - AIRBNB PERFECT"** workflow was using:
- Model: `gemini-pro-latest` (Google Gemini 2.5 Pro)
- Tier: **Free tier** with strict limits

## ✅ Solution Implemented

I've created a **new workflow** that replaces Gemini with Claude:

### New Workflow File
📄 **`Headless Generator - AIRBNB CLAUDE.json`**

### Key Changes
| Component | Before (Gemini) | After (Claude) |
|-----------|----------------|----------------|
| **Model** | `gemini-pro-latest` | `claude-3-5-sonnet-20241022` |
| **Node Type** | `lmChatGoogleGemini` | `lmChatAnthropic` |
| **Webhook Path** | `/generar-ui-airbnb` | `/generar-ui-airbnb-claude` |
| **Temperature** | 0.9 | 0.9 (maintained) |
| **Credentials** | Google PaLM API | Anthropic API |

## 🚀 How to Use the New Workflow

### Step 1: Import into n8n
1. Open your n8n instance
2. Click **"Import from File"**
3. Select: `Headless Generator - AIRBNB CLAUDE.json`
4. Click **Import**

### Step 2: Configure Credentials
The workflow needs these credentials (most are already configured):
- ✅ **Pinecone API** - Already configured
- ✅ **OpenAI API** - Already configured (for embeddings)
- ⚠️ **Anthropic API** - Uses existing credential: `WkRj3vctpxPVdcg0`

### Step 3: Activate the Workflow
1. Open the imported workflow
2. Click **"Active"** toggle to enable it
3. The webhook will be available at: `/generar-ui-airbnb-claude`

### Step 4: Update Your Figma Plugin (if needed)
If your Figma plugin calls the webhook directly, update the URL:

**Old URL:**
```
https://your-n8n-instance.com/webhook/generar-ui-airbnb
```

**New URL:**
```
https://your-n8n-instance.com/webhook/generar-ui-airbnb-claude
```

## 📊 Workflow Comparison

You now have **3 workflows** to choose from:

| Workflow | Model | Use Case | Status |
|----------|-------|----------|--------|
| **FINAL V7** | Claude 3.5 Sonnet | General UI generation | ✅ Working |
| **AIRBNB PERFECT** | Gemini Pro | AIRBNB-style UIs | ❌ Quota exceeded |
| **AIRBNB CLAUDE** | Claude 3.5 Sonnet | AIRBNB-style UIs | ✅ **NEW - Use this!** |

## 🔄 Alternative Solutions

If you still want to use Gemini in the future:

### Option 1: Upgrade Gemini API Plan
- Visit: [Google AI Studio Pricing](https://ai.google.dev/pricing)
- Upgrade from free tier to paid plan
- Higher quotas: More requests/tokens per day

### Option 2: Use Gemini 1.5 Flash (Lighter Model)
Change the model in the workflow:
```json
{
  "modelName": "models/gemini-1.5-flash"
}
```
- Faster responses
- Lower cost
- Higher quota limits

### Option 3: Implement Rate Limiting
Add a delay node between requests to stay within limits:
- Add **"Wait"** node before the Gemini node
- Set delay: 2-3 seconds between requests

## 🎨 Prompt Differences

Both workflows use the **same comprehensive prompt** that supports:
- ✅ Login/Auth screens
- ✅ Dashboards
- ✅ Landing pages
- ✅ E-commerce layouts
- ✅ Figma spacing variables
- ✅ Component library integration

The only difference is the AI model executing the prompt.

## 🐛 Troubleshooting

### If the new workflow fails:

**1. Check Anthropic API Credentials**
```bash
# In n8n, go to:
Settings → Credentials → Anthropic account
# Verify the API key is valid
```

**2. Check Anthropic API Quota**
- Visit: [Anthropic Console](https://console.anthropic.com/)
- Check your usage and limits

**3. Test the Webhook**
```bash
curl -X POST https://your-n8n-instance.com/webhook/generar-ui-airbnb-claude \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a simple login form"}'
```

## 📝 Next Steps

1. ✅ **Import** the new workflow into n8n
2. ✅ **Activate** it
3. ✅ **Test** with a simple prompt
4. ✅ **Update** your Figma plugin URL (if needed)
5. ⚠️ **Deactivate** the old Gemini workflow to avoid confusion

## 💡 Pro Tips

- **Monitor Usage**: Keep an eye on your Anthropic API usage
- **Cost Optimization**: Claude 3.5 Sonnet is more expensive than Gemini free tier, but more reliable
- **Fallback Strategy**: Keep both workflows active and switch between them if one has issues
- **Rate Limiting**: Consider adding delays if you make many requests

## 🆘 Need Help?

If you encounter issues:
1. Check n8n execution logs
2. Verify all credentials are valid
3. Test each node individually
4. Check the console for detailed error messages

---

**Created**: 2025-12-08  
**Status**: ✅ Ready to use  
**Workflow Version**: v1.0
