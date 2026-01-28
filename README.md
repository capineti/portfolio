# Headless Generator - Setup Guide

This project integrates **Figma**, **n8n**, **Pinecone**, and **Claude** to generate UI designs based on text prompts.

## Prerequisites

- **n8n**: A self-hosted or cloud instance of n8n.
- **Pinecone**: A vector database to store your design system components.
- **OpenAI API Key**: For generating embeddings.
- **Anthropic API Key**: For Claude 3.5 Sonnet (the "brain" of the generator).
- **Figma**: To run the plugin.

## 1. n8n Setup

1.  **Import Workflow**:
    - Open your n8n instance.
    - Go to **Workflows** -> **Import from File**.
    - Select the `Headless Generator - CLAUDE CREATIVE.json` file from this repository.

2.  **Configure Credentials**:
    - You will see nodes with missing credentials. Set them up:
        - **OpenAI**: Used by the "Embeddings OpenAI" node.
        - **Pinecone**: Used by the "Pinecone Search" node.
        - **Anthropic**: Used by the "Claude 3.5 Sonnet" node.

3.  **Activate Workflow**:
    - Toggle the **Active** switch to `true` (top right).
    - Note the **Production URL** of the Webhook node (e.g., `https://your-n8n.com/webhook/generar-ui-v2`).

## 2. Pinecone Setup (Critical)

The workflow expects a Pinecone index named `design-system`.
**Important**: You must populate this index with your Figma components.

- **Index Name**: `design-system`
- **Dimensions**: 1536 (standard for OpenAI `text-embedding-3-small`)
- **Metadata**: Each vector should have:
    - `componentName`: Name of the component (e.g., "Primary Button").
    - `componentKey`: The Figma `key` of the component.
    - `componentType`: "COMPONENT" or "COMPONENT_SET".
    - `pageContent`: A text description of what the component is/does.

> **Note**: If the index is empty, the generator will create "Mock" placeholders instead of real components.

## 3. Figma Plugin Setup

1.  **Open Figma**.
2.  **Right-click** on the canvas -> **Plugins** -> **Development** -> **Import plugin from manifest...**
3.  Select the `manifest.json` file from the `Headless-Generator` folder.
4.  Run the plugin (**Headless Generator**).

## 4. Connecting Plugin to n8n

1.  In the plugin window, click the **⚙️ Settings** button (top right).
2.  Paste your **n8n Webhook URL** (from Step 1.3).
3.  Enter a prompt (e.g., "Create a modern login screen") and click **Generate UI**.

## Troubleshooting

- **Network Error**: Ensure your n8n instance allows CORS (Cross-Origin Resource Sharing) or use a proxy if running locally.
- **"Missing children" error**: This usually means Claude failed to generate valid JSON. Check the n8n execution logs for details.
- **Placeholders only**: This means the Pinecone search didn't find relevant components. Check your Pinecone index.
