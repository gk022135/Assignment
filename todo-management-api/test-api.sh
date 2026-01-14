#!/bin/bash

# Todo Management API - Testing Script
# Make sure the API is running on http://localhost:3000 before running this script

BASE_URL="http://localhost:3000"
USER_EMAIL="testuser@example.com"
USER_PASSWORD="password123"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="adminpass123"

echo "=== Todo Management API Test Suite ==="
echo ""

# 1. Signup User
echo "1. Signing up user..."
USER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/signup" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Test User\",
    \"email\": \"$USER_EMAIL\",
    \"password\": \"$USER_PASSWORD\"
  }")
echo "Response: $USER_RESPONSE"
USER_ID=$(echo $USER_RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)
echo "User ID: $USER_ID"
echo ""

# 2. Login User
echo "2. Logging in user..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$USER_EMAIL\",
    \"password\": \"$USER_PASSWORD\"
  }")
echo "Response: $LOGIN_RESPONSE"
USER_TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)
echo "User Token: $USER_TOKEN"
echo ""

# 3. Get User Profile
echo "3. Getting user profile..."
curl -s -X GET "$BASE_URL/users/me" \
  -H "Authorization: Bearer $USER_TOKEN" | jq '.'
echo ""

# 4. Create First Todo
echo "4. Creating first todo..."
TODO1_RESPONSE=$(curl -s -X POST "$BASE_URL/todos" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -d "{
    \"title\": \"Buy groceries\",
    \"description\": \"Milk, eggs, bread\",
    \"completed\": false
  }")
echo "Response: $TODO1_RESPONSE"
TODO1_ID=$(echo $TODO1_RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)
echo "Todo 1 ID: $TODO1_ID"
echo ""

# 5. Create Second Todo
echo "5. Creating second todo..."
TODO2_RESPONSE=$(curl -s -X POST "$BASE_URL/todos" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -d "{
    \"title\": \"Complete project\",
    \"description\": \"Finish the NestJS API\",
    \"completed\": false
  }")
echo "Response: $TODO2_RESPONSE"
TODO2_ID=$(echo $TODO2_RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)
echo "Todo 2 ID: $TODO2_ID"
echo ""

# 6. Get User's Todos (Paginated)
echo "6. Getting user's todos (page 1, limit 10)..."
curl -s -X GET "$BASE_URL/todos?page=1&limit=10" \
  -H "Authorization: Bearer $USER_TOKEN" | jq '.'
echo ""

# 7. Update Todo
echo "7. Updating first todo to completed..."
curl -s -X PATCH "$BASE_URL/todos/$TODO1_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -d "{
    \"completed\": true
  }" | jq '.'
echo ""

# 8. Update User Profile
echo "8. Updating user profile..."
curl -s -X PATCH "$BASE_URL/users/me" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -d "{
    \"name\": \"Updated User Name\"
  }" | jq '.'
echo ""

# 9. Delete Todo
echo "9. Deleting second todo..."
curl -s -X DELETE "$BASE_URL/todos/$TODO2_ID" \
  -H "Authorization: Bearer $USER_TOKEN" | jq '.'
echo ""

# 10. Get Todos After Delete
echo "10. Getting user's todos after delete..."
curl -s -X GET "$BASE_URL/todos?page=1&limit=10" \
  -H "Authorization: Bearer $USER_TOKEN" | jq '.'
echo ""

# 11. Logout
echo "11. Logging out..."
curl -s -X POST "$BASE_URL/auth/logout" \
  -H "Authorization: Bearer $USER_TOKEN" | jq '.'
echo ""

# 12. Try to access protected route after logout (should fail)
echo "12. Attempting to access /users/me after logout (should fail)..."
curl -s -X GET "$BASE_URL/users/me" \
  -H "Authorization: Bearer $USER_TOKEN" | jq '.'
echo ""

echo "=== Test Suite Complete ==="
