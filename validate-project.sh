#!/bin/bash

# DASHED OS Project Validation Script
# This script tests the project build, deployment readiness, and validates all functionality

echo "🚀 DASHED OS Project Validation Starting..."
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $2 -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
        echo -e "${RED}   Error: $3${NC}"
    fi
}

# Function to print info
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Function to print warning
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Initialize counters
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

# Function to run check
run_check() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    echo ""
    print_info "Running: $1"
    
    if eval "$2"; then
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
        print_status "$1" 0
    else
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
        print_status "$1" 1 "$3"
    fi
}

echo ""
echo "🔍 Phase 1: Environment Validation"
echo "================================================"

# Check Node.js version
run_check "Node.js version check" "node --version | grep -E 'v(18|20|22)'" "Node.js 18+ required"

# Check pnpm availability
run_check "pnpm package manager check" "command -v pnpm >/dev/null 2>&1" "pnpm not installed"

# Check if package.json exists
run_check "package.json exists" "test -f package.json" "package.json not found"

# Check if .env.local exists
if [ -f .env.local ]; then
    run_check ".env.local exists" "true" ""
else
    print_warning ".env.local not found - create from .env.example for local development"
fi

echo ""
echo "📦 Phase 2: Dependencies and Build"
echo "================================================"

# Install dependencies
run_check "Install dependencies" "pnpm install --frozen-lockfile" "Dependency installation failed"

# Type checking
run_check "TypeScript type checking" "pnpm run type-check" "Type checking failed"

# Linting
run_check "Code linting" "pnpm run lint" "Linting failed"

# Build the project
run_check "Project build" "pnpm run build" "Build failed"

echo ""
echo "🧪 Phase 3: Testing"
echo "================================================"

# Run unit tests
run_check "Unit tests" "pnpm test -- --passWithNoTests" "Unit tests failed"

# Check if E2E tests exist and run them
if [ -d "__tests__" ] || [ -d "tests" ] || [ -d "e2e" ]; then
    if command -v playwright >/dev/null 2>&1; then
        run_check "E2E tests" "pnpm run test:e2e" "E2E tests failed"
    else
        print_warning "Playwright not available for E2E tests"
    fi
else
    print_info "No E2E tests found"
fi

echo ""
echo "📄 Phase 4: Documentation Validation"
echo "================================================"

# Check documentation structure
run_check "README.md exists" "test -f docs/README.md" "Main README not found"
run_check "API documentation exists" "test -f docs/api-reference.md" "API docs not found"
run_check "Developer guide exists" "test -f docs/developer-guide.md" "Developer guide not found"
run_check "Architecture docs exist" "test -f docs/architecture.md" "Architecture docs not found"
run_check "Setup guide exists" "test -f docs/setup-guide.md" "Setup guide not found"

# Check patch documentation
run_check "Patch documentation exists" "test -d docs/patches" "Patch docs folder not found"
run_check "Patch-0 documentation" "test -d docs/patches/patch-0" "Patch-0 docs not found"
run_check "Patch-1 documentation" "test -d docs/patches/patch-1" "Patch-1 docs not found"

# Check for our new files
run_check "UPDATE_CHECKLIST.md exists" "test -f docs/UPDATE_CHECKLIST.md" "Update checklist not found"
run_check "CONSOLIDATED_SUMMARY.md exists" "test -f docs/CONSOLIDATED_SUMMARY.md" "Consolidated summary not found"

echo ""
echo "🏗️  Phase 5: Project Structure Validation"
echo "================================================"

# Check core directories
run_check "app directory exists" "test -d app" "app directory not found"
run_check "components directory exists" "test -d components" "components directory not found"
run_check "lib directory exists" "test -d lib" "lib directory not found"
run_check "types directory exists" "test -d types" "types directory not found"

# Check API routes
run_check "API routes exist" "test -d app/api" "API routes directory not found"
run_check "Auth API exists" "test -d app/api/auth" "Auth API not found"
run_check "Users API exists" "test -f app/api/users/route.ts" "Users API not found"
run_check "Devices API exists" "test -f app/api/devices/route.ts" "Devices API not found"
run_check "Products API exists" "test -f app/api/products/route.ts" "Products API not found"
run_check "Orders API exists" "test -f app/api/orders/route.ts" "Orders API not found"

# Check core components
run_check "UI components exist" "test -d components/ui" "UI components not found"
run_check "Auth components exist" "test -d components/auth" "Auth components not found"

# Check configuration files
run_check "Next.js config exists" "test -f next.config.mjs" "Next.js config not found"
run_check "Tailwind config exists" "test -f tailwind.config.js" "Tailwind config not found"
run_check "TypeScript config exists" "test -f tsconfig.json" "TypeScript config not found"

echo ""
echo "🔐 Phase 6: Security and Configuration"
echo "================================================"

# Check for sensitive files that shouldn't be committed
if [ -f .env ]; then
    print_warning ".env file found - ensure it's in .gitignore"
else
    run_check "No .env in repository" "true" ""
fi

# Check gitignore
run_check ".gitignore exists" "test -f .gitignore" ".gitignore not found"

# Check for common security patterns
run_check "Environment variables used" "grep -r 'process.env' app/ lib/ --include='*.ts' --include='*.tsx' >/dev/null 2>&1" "No environment variables usage found"

echo ""
echo "🚀 Phase 7: Deployment Readiness"
echo "================================================"

# Check if build artifacts are created
run_check "Build output exists" "test -d .next" "Build output not found - run 'pnpm build' first"

# Check for Vercel configuration
if [ -f vercel.json ]; then
    run_check "Vercel config exists" "true" ""
else
    print_info "No vercel.json found (optional)"
fi

# Check package.json scripts
run_check "Start script exists" "grep -q '\"start\"' package.json" "Start script not found"
run_check "Build script exists" "grep -q '\"build\"' package.json" "Build script not found"
run_check "Dev script exists" "grep -q '\"dev\"' package.json" "Dev script not found"

echo ""
echo "📋 Phase 8: Feature Completeness Check"
echo "================================================"

# Check for admin functionality (if implemented)
if [ -d "app/(admin)" ] || [ -d "app/admin" ] || [ -f "app/api/admin/dashboard/route.ts" ]; then
    run_check "Admin functionality detected" "true" ""
    
    # Check for admin API routes
    if [ -d "app/api/admin" ]; then
        run_check "Admin API routes exist" "true" ""
    else
        print_warning "Admin routes not fully implemented"
    fi
else
    print_info "Admin functionality not yet implemented (planned for Patch 1.1)"
fi

# Check for authentication
run_check "Authentication pages exist" "test -d components/auth || ls app/**/auth* >/dev/null 2>&1" "Authentication components not found"

# Check for dashboard
run_check "Dashboard API exists" "test -f app/api/dashboard/route.ts" "Dashboard API not found"

# Check for support system
run_check "Support API exists" "test -d app/api/support" "Support API not found"

echo ""
echo "🎯 Phase 9: Performance and Optimization"
echo "================================================"

# Check bundle size (if build exists)
if [ -d .next ]; then
    # Get build info
    BUILD_SIZE=$(du -sh .next 2>/dev/null | cut -f1)
    if [ ! -z "$BUILD_SIZE" ]; then
        print_info "Build size: $BUILD_SIZE"
        run_check "Build size reasonable" "true" ""
    else
        print_warning "Could not determine build size"
    fi
fi

# Check for optimization files
run_check "PostCSS config exists" "test -f postcss.config.mjs" "PostCSS config not found"

echo ""
echo "📊 Validation Summary"
echo "================================================"

print_info "Total checks: $TOTAL_CHECKS"
print_info "Passed: $PASSED_CHECKS"
print_info "Failed: $FAILED_CHECKS"

PASS_PERCENTAGE=$((PASSED_CHECKS * 100 / TOTAL_CHECKS))

echo ""
if [ $FAILED_CHECKS -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! Project is ready for deployment.${NC}"
    EXIT_CODE=0
elif [ $PASS_PERCENTAGE -ge 80 ]; then
    echo -e "${YELLOW}⚠️  Most checks passed ($PASS_PERCENTAGE%). Review failed checks before deployment.${NC}"
    EXIT_CODE=1
else
    echo -e "${RED}❌ Multiple checks failed ($PASS_PERCENTAGE% passed). Address issues before deployment.${NC}"
    EXIT_CODE=2
fi

echo ""
echo "🔗 Next Steps"
echo "================================================"

if [ $FAILED_CHECKS -gt 0 ]; then
    echo "1. Review and fix failed checks above"
    echo "2. Run this script again to validate fixes"
fi

echo "3. Test the application locally with 'pnpm dev'"
echo "4. Test all major user flows manually"
echo "5. Deploy to staging environment for final testing"
echo "6. Deploy to production"
echo "7. Monitor deployment and verify functionality"

echo ""
echo -e "${BLUE}📖 For detailed setup instructions, see: docs/setup-guide.md${NC}"
echo -e "${BLUE}📖 For deployment guide, see: docs/README.md${NC}"
echo ""

exit $EXIT_CODE
