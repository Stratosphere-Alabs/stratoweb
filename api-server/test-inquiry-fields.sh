#!/bin/bash

# Test script to verify inquiry field name compatibility
# Tests both sourcePage (camelCase) and source_page (snake_case) formats

echo "======================================"
echo "Inquiry Field Name Compatibility Test"
echo "======================================"
echo ""

API_URL=${1:-"http://localhost:3001"}
echo "Testing against: $API_URL"
echo ""

# Test 1: Submit with sourcePage (camelCase)
echo "[TEST 1] Submitting inquiry with sourcePage (camelCase)..."
RESPONSE_1=$(curl -s -X POST "$API_URL/inquiries" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User CamelCase",
    "email": "test-camel@example.com",
    "company": "Test Company",
    "message": "Testing sourcePage field",
    "sourcePage": "/contact"
  }')

ID_1=$(echo "$RESPONSE_1" | jq -r '.id' 2>/dev/null)
if [ "$ID_1" != "null" ] && [ -n "$ID_1" ]; then
    echo "✅ PASS: Created inquiry with ID: $ID_1"
else
    echo "❌ FAIL: Failed to create inquiry"
    echo "Response: $RESPONSE_1"
fi
echo ""

# Test 2: Submit with source_page (snake_case)
echo "[TEST 2] Submitting inquiry with source_page (snake_case)..."
RESPONSE_2=$(curl -s -X POST "$API_URL/inquiries" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User SnakeCase",
    "email": "test-snake@example.com",
    "company": "Test Company",
    "message": "Testing source_page field",
    "source_page": "/products"
  }')

ID_2=$(echo "$RESPONSE_2" | jq -r '.id' 2>/dev/null)
if [ "$ID_2" != "null" ] && [ -n "$ID_2" ]; then
    echo "✅ PASS: Created inquiry with ID: $ID_2"
else
    echo "❌ FAIL: Failed to create inquiry"
    echo "Response: $RESPONSE_2"
fi
echo ""

# Test 3: Submit with both fields (sourcePage should take precedence)
echo "[TEST 3] Submitting inquiry with BOTH fields (sourcePage should win)..."
RESPONSE_3=$(curl -s -X POST "$API_URL/inquiries" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User Both Fields",
    "email": "test-both@example.com",
    "company": "Test Company",
    "message": "Testing both sourcePage and source_page fields",
    "sourcePage": "/contact-sales",
    "source_page": "/should-be-ignored"
  }')

ID_3=$(echo "$RESPONSE_3" | jq -r '.id' 2>/dev/null)
if [ "$ID_3" != "null" ] && [ -n "$ID_3" ]; then
    echo "✅ PASS: Created inquiry with ID: $ID_3"
else
    echo "❌ FAIL: Failed to create inquiry"
    echo "Response: $RESPONSE_3"
fi
echo ""

# Test 4: Submit without source page (should still work)
echo "[TEST 4] Submitting inquiry without source_page field..."
RESPONSE_4=$(curl -s -X POST "$API_URL/inquiries" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User No Source",
    "email": "test-nosource@example.com",
    "company": "Test Company",
    "message": "Testing without source_page field"
  }')

ID_4=$(echo "$RESPONSE_4" | jq -r '.id' 2>/dev/null)
if [ "$ID_4" != "null" ] && [ -n "$ID_4" ]; then
    echo "✅ PASS: Created inquiry with ID: $ID_4"
else
    echo "❌ FAIL: Failed to create inquiry"
    echo "Response: $RESPONSE_4"
fi
echo ""

echo "======================================"
echo "Verification via Admin API"
echo "======================================"
echo ""

# Check if admin API is available
if [ -n "$ADMIN_USER" ] && [ -n "$ADMIN_PASS" ]; then
    echo "Checking admin API with credentials..."
    
    # Verify Test 1 result
    if [ -n "$ID_1" ] && [ "$ID_1" != "null" ]; then
        echo "[VERIFY 1] Checking sourcePage submission..."
        ADMIN_RESPONSE=$(curl -s -u "$ADMIN_USER:$ADMIN_PASS" "$API_URL/admin-api/inquiries?q=test-camel@example.com")
        SOURCE_PAGE=$(echo "$ADMIN_RESPONSE" | jq -r '.items[0].source_page' 2>/dev/null)
        if [ "$SOURCE_PAGE" == "/contact" ]; then
            echo "✅ VERIFIED: source_page correctly saved as '/contact'"
        else
            echo "❌ FAILED: source_page is '$SOURCE_PAGE' (expected '/contact')"
        fi
    fi
    echo ""
    
    # Verify Test 2 result
    if [ -n "$ID_2" ] && [ "$ID_2" != "null" ]; then
        echo "[VERIFY 2] Checking source_page submission..."
        ADMIN_RESPONSE=$(curl -s -u "$ADMIN_USER:$ADMIN_PASS" "$API_URL/admin-api/inquiries?q=test-snake@example.com")
        SOURCE_PAGE=$(echo "$ADMIN_RESPONSE" | jq -r '.items[0].source_page' 2>/dev/null)
        if [ "$SOURCE_PAGE" == "/products" ]; then
            echo "✅ VERIFIED: source_page correctly saved as '/products'"
        else
            echo "❌ FAILED: source_page is '$SOURCE_PAGE' (expected '/products')"
        fi
    fi
    echo ""
    
    # Verify Test 3 result (precedence)
    if [ -n "$ID_3" ] && [ "$ID_3" != "null" ]; then
        echo "[VERIFY 3] Checking precedence (sourcePage over source_page)..."
        ADMIN_RESPONSE=$(curl -s -u "$ADMIN_USER:$ADMIN_PASS" "$API_URL/admin-api/inquiries?q=test-both@example.com")
        SOURCE_PAGE=$(echo "$ADMIN_RESPONSE" | jq -r '.items[0].source_page' 2>/dev/null)
        if [ "$SOURCE_PAGE" == "/contact-sales" ]; then
            echo "✅ VERIFIED: sourcePage took precedence: '/contact-sales'"
        else
            echo "❌ FAILED: source_page is '$SOURCE_PAGE' (expected '/contact-sales')"
        fi
    fi
    echo ""
else
    echo "⚠️  SKIP: Admin API verification requires ADMIN_USER and ADMIN_PASS environment variables"
    echo "   Example: ADMIN_USER=admin ADMIN_PASS=yourpassword ./test-inquiry-fields.sh"
    echo ""
fi

echo "======================================"
echo "Test Summary"
echo "======================================"
echo "All submission tests passed if you see 4 ✅ marks above."
echo ""
echo "To verify data in admin dashboard:"
echo "1. Set credentials: export ADMIN_USER=admin ADMIN_PASS=yourpassword"
echo "2. Re-run this script"
echo "OR"
echo "3. Visit http://47.74.8.197/admin in browser"
echo ""
