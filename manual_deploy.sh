#!/bin/bash

# Manual Deployment Script for IONOS FTP
# Usage: ./manual_deploy.sh
# Follow the prompts to enter your credentials.

echo "========================================"
echo "   MANUAL DEPLOYMENT TO IONOS SERVER"
echo "========================================"
echo ""
echo "This script will upload your website files (HTML, CSS, JS, Images) to your FTP server."
echo "Prerequisites: You need your IONOS FTP Server Address, Username, and Password."
echo ""

# 1. Gather Credentials
echo -n "Enter FTP Server (e.g., access123.webspace-data.io): "
read FTP_SERVER

echo -n "Enter FTP Username (e.g., u12345678): "
read FTP_USER

echo -n "Enter FTP Password: "
read -s FTP_PASS
echo ""

echo "----------------------------------------"
echo "Starting Upload..."
echo "----------------------------------------"

# 2. Upload Files
# We loop through specific file types to avoid uploading junk.

# Helper function for upload
upload_file() {
    local file=$1
    local remote_path=$2
    
    if [ -f "$file" ]; then
        echo "Uploading $file..."
        # curl -T sends the file to the FTP server
        # --ftp-create-dirs ensures directories exist (if supported/needed)
        # --user auth
        curl -T "$file" --user "$FTP_USER:$FTP_PASS" "ftp://$FTP_SERVER/$remote_path" --ftp-create-dirs --silent --show-error
        
        if [ $? -eq 0 ]; then
            echo "✅ $file uploaded."
        else
            echo "❌ Failed to upload $file."
        fi
    fi
}

# Upload Root files (HTML, JS, CSS not inside folders, Images)
# Note: zsh/bash nuances with wildcards. We use simple glob expansion.
for file in index.html *.js *.css *.png *.jpg *.svg; do
    [ -e "$file" ] || continue
    # exclude node scripts if any
    if [[ "$file" == "generate_logos"* ]]; then continue; fi
    if [[ "$file" == "manual_deploy.sh" ]]; then continue; fi
    
    upload_file "$file" ""
done

# Upload Logos folder if exists
if [ -d "logos" ]; then
    echo "Uploading 'logos' folder..."
    for file in logos/*; do
        [ -e "$file" ] || continue
        filename=$(basename "$file")
        upload_file "$file" "logos/$filename"
    done
fi

echo "----------------------------------------"
echo "🎉 Deployment Process Complete!"
echo "Check your website at the IONOS domain."
echo "========================================"
