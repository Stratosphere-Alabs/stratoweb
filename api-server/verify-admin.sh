#!/bin/bash

# Quick verification script for Admin Dashboard functionality
# Run this after deploying to ECS

echo "==================================="
echo "Admin Dashboard Verification Script"
echo "==================================="
echo ""

# Check if running on ECS or local
if [ -f /etc/nginx/.htpasswd ]; then
    LOCATION="ECS"
    BASE_URL="http://47.74.8.197"
else
    LOCATION="Local"
    BASE_URL="http://127.0.0.1:3001"
fi

echo "Location: $LOCATION"
echo "Base URL: $BASE_URL"
echo ""

# Prompt for credentials
read -p "Enter admin username (default: admin): " ADMIN_USER
ADMIN_USER=${ADMIN_USER:-admin}

read -sp "Enter admin password: " ADMIN_PASS
echo ""
echo ""

# Test 1: Check auth is required
echo "[TEST 1] Checking Basic Auth is enabled..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/admin)
if [ "$HTTP_CODE" == "401" ]; then
    echo "✅ PASS: /admin requires authentication (401)"
else
    echo "❌ FAIL: /admin returned $HTTP_CODE (expected 401)"
fi
echo ""

# Test 2: Check admin UI loads with auth
echo "[TEST 2] Checking admin UI loads with credentials..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -u "$ADMIN_USER:$ADMIN_PASS" $BASE_URL/admin)
if [ "$HTTP_CODE" == "200" ]; then
    echo "✅ PASS: /admin loads successfully with auth"
else
    echo "❌ FAIL: /admin returned $HTTP_CODE (expected 200)"
fi
echo ""

# Test 3: Check inquiries API
echo "[TEST 3] Testing /admin-api/inquiries..."
RESPONSE=$(curl -s -u "$ADMIN_USER:$ADMIN_PASS" "$BASE_URL/admin-api/inquiries?limit=5")
if echo "$RESPONSE" | jq -e '.total' > /dev/null 2>&1; then
    TOTAL=$(echo "$RESPONSE" | jq '.total')
    ITEMS=$(echo "$RESPONSE" | jq '.items | length')
    echo "✅ PASS: Retrieved $ITEMS inquiries (total: $TOTAL)"
else
    echo "❌ FAIL: Invalid response from /admin-api/inquiries"
    echo "Response: $RESPONSE"
fi
echo ""

# Test 4: Check waitlist users API
echo "[TEST 4] Testing /admin-api/waitlist-users..."
RESPONSE=$(curl -s -u "$ADMIN_USER:$ADMIN_PASS" "$BASE_URL/admin-api/waitlist-users?limit=5")
if echo "$RESPONSE" | jq -e '.total' > /dev/null 2>&1; then
    TOTAL=$(echo "$RESPONSE" | jq '.total')
    ITEMS=$(echo "$RESPONSE" | jq '.items | length')
    echo "✅ PASS: Retrieved $ITEMS waitlist users (total: $TOTAL)"
else
    echo "❌ FAIL: Invalid response from /admin-api/waitlist-users"
    echo "Response: $RESPONSE"
fi
echo ""

# Test 5: Check waitlist events API
echo "[TEST 5] Testing /admin-api/waitlist-events..."
RESPONSE=$(curl -s -u "$ADMIN_USER:$ADMIN_PASS" "$BASE_URL/admin-api/waitlist-events?limit=5")
if echo "$RESPONSE" | jq -e '.total' > /dev/null 2>&1; then
    TOTAL=$(echo "$RESPONSE" | jq '.total')
    ITEMS=$(echo "$RESPONSE" | jq '.items | length')
    echo "✅ PASS: Retrieved $ITEMS waitlist events (total: $TOTAL)"
else
    echo "❌ FAIL: Invalid response from /admin-api/waitlist-events"
    echo "Response: $RESPONSE"
fi
echo ""

# Test 6: Check CSV export
echo "[TEST 6] Testing CSV export..."
HTTP_CODE=$(curl -s -o /tmp/test_export.csv -w "%{http_code}" -u "$ADMIN_USER:$ADMIN_PASS" "$BASE_URL/admin-api/export/inquiries.csv")
if [ "$HTTP_CODE" == "200" ] && [ -f /tmp/test_export.csv ]; then
    LINES=$(wc -l < /tmp/test_export.csv)
    echo "✅ PASS: CSV export successful ($LINES lines)"
    rm /tmp/test_export.csv
else
    echo "❌ FAIL: CSV export returned $HTTP_CODE"
fi
echo ""

# Test 7: Check search functionality
echo "[TEST 7] Testing search functionality..."
RESPONSE=$(curl -s -u "$ADMIN_USER:$ADMIN_PASS" "$BASE_URL/admin-api/inquiries?q=test")
if echo "$RESPONSE" | jq -e '.items' > /dev/null 2>&1; then
    echo "✅ PASS: Search query works"
else
    echo "❌ FAIL: Search query failed"
fi
echo ""

# Test 8: Check pagination
echo "[TEST 8] Testing pagination..."
RESPONSE=$(curl -s -u "$ADMIN_USER:$ADMIN_PASS" "$BASE_URL/admin-api/inquiries?limit=10&offset=0")
if echo "$RESPONSE" | jq -e '.limit == 10 and .offset == 0' > /dev/null 2>&1; then
    echo "✅ PASS: Pagination parameters work correctly"
else
    echo "❌ FAIL: Pagination parameters not working"
fi
echo ""

echo "==================================="
echo "Verification Complete!"
echo "==================================="
echo ""
echo "Next steps:"
echo "1. Open browser to: $BASE_URL/admin"
echo "2. Login with credentials"
echo "3. Test each tab manually"
echo "4. Try search and pagination"
echo "5. Download CSV files"
echo ""
