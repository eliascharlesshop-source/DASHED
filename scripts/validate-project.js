#!/usr/bin/env node

/**
 * DASHED OS Project Validation Script
 * Validates all pages, APIs, and functionality before deployment
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

class ProjectValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.successes = [];
    this.startTime = Date.now();
  }

  log(message, color = 'white') {
    console.log(`${COLORS[color]}${message}${COLORS.reset}`);
  }

  error(message) {
    this.errors.push(message);
    this.log(`❌ ERROR: ${message}`, 'red');
  }

  warning(message) {
    this.warnings.push(message);
    this.log(`⚠️  WARNING: ${message}`, 'yellow');
  }

  success(message) {
    this.successes.push(message);
    this.log(`✅ SUCCESS: ${message}`, 'green');
  }

  info(message) {
    this.log(`ℹ️  INFO: ${message}`, 'blue');
  }

  async validateProjectStructure() {
    this.log('\n🔍 Validating Project Structure...', 'cyan');

    const requiredFiles = [
      'package.json',
      'next.config.mjs',
      'tailwind.config.js',
      'tsconfig.json',
      'app/layout.tsx',
      'app/page.tsx',
      'components/ui',
      'lib/utils.ts',
      'types/index.ts'
    ];

    const requiredDirs = [
      'app',
      'components',
      'lib',
      'types',
      'public',
      'docs'
    ];

    for (const file of requiredFiles) {
      if (fs.existsSync(path.join(process.cwd(), file))) {
        this.success(`Required file exists: ${file}`);
      } else {
        this.error(`Missing required file: ${file}`);
      }
    }

    for (const dir of requiredDirs) {
      if (fs.existsSync(path.join(process.cwd(), dir))) {
        this.success(`Required directory exists: ${dir}`);
      } else {
        this.error(`Missing required directory: ${dir}`);
      }
    }
  }

  async validateDependencies() {
    this.log('\n📦 Validating Dependencies...', 'cyan');

    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      const criticalDeps = [
        'next',
        'react',
        'react-dom',
        'typescript',
        'tailwindcss',
        '@supabase/supabase-js'
      ];

      for (const dep of criticalDeps) {
        if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
          this.success(`Critical dependency found: ${dep}`);
        } else {
          this.error(`Missing critical dependency: ${dep}`);
        }
      }

      // Check for node_modules
      if (fs.existsSync('node_modules')) {
        this.success('Node modules directory exists');
      } else {
        this.error('Node modules not installed - run: pnpm install');
      }

    } catch (error) {
      this.error(`Failed to parse package.json: ${error.message}`);
    }
  }

  async validateAPIRoutes() {
    this.log('\n🛠️ Validating API Routes...', 'cyan');

    const apiRoutes = [
      'app/api/auth',
      'app/api/users',
      'app/api/devices',
      'app/api/products',
      'app/api/orders',
      'app/api/dashboard',
      'app/api/support',
      'app/api/notifications'
    ];

    for (const route of apiRoutes) {
      const routePath = path.join(process.cwd(), route);
      if (fs.existsSync(routePath)) {
        // Check for route.ts file
        const routeFile = path.join(routePath, 'route.ts');
        if (fs.existsSync(routeFile)) {
          this.success(`API route exists: ${route}/route.ts`);
        } else {
          this.warning(`API route directory exists but missing route.ts: ${route}`);
        }
      } else {
        this.warning(`Missing API route: ${route}`);
      }
    }
  }

  async validatePages() {
    this.log('\n📄 Validating Pages...', 'cyan');

    const pages = [
      'app/(app)/page.tsx',
      'app/(app)/dashboard/page.tsx',
      'app/(app)/devices/page.tsx',
      'app/(app)/profile/page.tsx',
      'app/(marketing)/page.tsx',
      'app/checkout/page.tsx'
    ];

    for (const page of pages) {
      if (fs.existsSync(path.join(process.cwd(), page))) {
        this.success(`Page exists: ${page}`);
      } else {
        this.warning(`Missing page: ${page}`);
      }
    }
  }

  async validateComponents() {
    this.log('\n🧩 Validating Components...', 'cyan');

    const criticalComponents = [
      'components/ui/button.tsx',
      'components/ui/input.tsx',
      'components/ui/card.tsx',
      'components/navbar.tsx',
      'components/footer.tsx',
      'components/theme-provider.tsx'
    ];

    for (const component of criticalComponents) {
      if (fs.existsSync(path.join(process.cwd(), component))) {
        this.success(`Component exists: ${component}`);
      } else {
        this.warning(`Missing component: ${component}`);
      }
    }
  }

  async validateEnvironment() {
    this.log('\n🌍 Validating Environment...', 'cyan');

    const envFiles = ['.env.local', '.env.example'];
    let hasEnvFile = false;

    for (const envFile of envFiles) {
      if (fs.existsSync(envFile)) {
        this.success(`Environment file exists: ${envFile}`);
        hasEnvFile = true;
      }
    }

    if (!hasEnvFile) {
      this.warning('No environment files found');
    }

    // Check critical environment variables
    const criticalEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];

    for (const envVar of criticalEnvVars) {
      if (process.env[envVar]) {
        this.success(`Environment variable set: ${envVar}`);
      } else {
        this.warning(`Missing environment variable: ${envVar}`);
      }
    }
  }

  async validateDocumentation() {
    this.log('\n📚 Validating Documentation...', 'cyan');

    const docs = [
      'docs/README.md',
      'docs/api-reference.md',
      'docs/architecture.md',
      'docs/developer-guide.md',
      'docs/setup-guide.md',
      'docs/UPDATE_CHECKLIST.md'
    ];

    for (const doc of docs) {
      if (fs.existsSync(path.join(process.cwd(), doc))) {
        this.success(`Documentation exists: ${doc}`);
      } else {
        this.warning(`Missing documentation: ${doc}`);
      }
    }

    // Check patch documentation
    const patchDirs = ['docs/patches/patch-0', 'docs/patches/patch-1'];
    for (const dir of patchDirs) {
      if (fs.existsSync(path.join(process.cwd(), dir))) {
        this.success(`Patch directory exists: ${dir}`);
      } else {
        this.info(`Patch directory not yet created: ${dir}`);
      }
    }
  }

  async runTypeScript() {
    this.log('\n🔍 Running TypeScript Check...', 'cyan');

    return new Promise((resolve) => {
      const tsc = spawn('npx', ['tsc', '--noEmit'], {
        stdio: 'pipe',
        shell: true
      });

      let output = '';
      let errorOutput = '';

      tsc.stdout.on('data', (data) => {
        output += data.toString();
      });

      tsc.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      tsc.on('close', (code) => {
        if (code === 0) {
          this.success('TypeScript check passed');
        } else {
          this.error('TypeScript check failed');
          if (errorOutput) {
            this.log(errorOutput, 'red');
          }
        }
        resolve();
      });

      tsc.on('error', (err) => {
        this.error(`Failed to run TypeScript check: ${err.message}`);
        resolve();
      });
    });
  }

  async runLinter() {
    this.log('\n🔍 Running ESLint...', 'cyan');

    return new Promise((resolve) => {
      const eslint = spawn('npx', ['next', 'lint'], {
        stdio: 'pipe',
        shell: true
      });

      let output = '';
      let errorOutput = '';

      eslint.stdout.on('data', (data) => {
        output += data.toString();
      });

      eslint.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      eslint.on('close', (code) => {
        if (code === 0) {
          this.success('ESLint check passed');
        } else {
          this.warning('ESLint found issues');
          if (output) {
            this.log(output, 'yellow');
          }
        }
        resolve();
      });

      eslint.on('error', (err) => {
        this.warning(`Failed to run ESLint: ${err.message}`);
        resolve();
      });
    });
  }

  async testBuild() {
    this.log('\n🏗️ Testing Build Process...', 'cyan');

    return new Promise((resolve) => {
      const build = spawn('pnpm', ['build'], {
        stdio: 'pipe',
        shell: true
      });

      let output = '';
      let errorOutput = '';

      build.stdout.on('data', (data) => {
        output += data.toString();
      });

      build.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      build.on('close', (code) => {
        if (code === 0) {
          this.success('Build process completed successfully');
        } else {
          this.error('Build process failed');
          if (errorOutput) {
            this.log(errorOutput, 'red');
          }
        }
        resolve();
      });

      build.on('error', (err) => {
        this.error(`Failed to run build: ${err.message}`);
        resolve();
      });
    });
  }

  async generateReport() {
    const duration = Date.now() - this.startTime;
    
    this.log('\n📊 Validation Report', 'magenta');
    this.log('='.repeat(50), 'magenta');
    
    this.log(`\n✅ Successes: ${this.successes.length}`, 'green');
    this.log(`⚠️  Warnings: ${this.warnings.length}`, 'yellow');
    this.log(`❌ Errors: ${this.errors.length}`, 'red');
    this.log(`⏱️  Duration: ${(duration / 1000).toFixed(2)}s`, 'blue');

    if (this.errors.length > 0) {
      this.log('\n❌ Critical Issues:', 'red');
      this.errors.forEach(error => this.log(`  • ${error}`, 'red'));
    }

    if (this.warnings.length > 0) {
      this.log('\n⚠️  Warnings:', 'yellow');
      this.warnings.forEach(warning => this.log(`  • ${warning}`, 'yellow'));
    }

    // Overall status
    this.log('\n🎯 Overall Status:', 'cyan');
    if (this.errors.length === 0) {
      this.log('✅ PROJECT READY FOR DEVELOPMENT', 'green');
    } else if (this.errors.length < 5) {
      this.log('⚠️  PROJECT NEEDS MINOR FIXES', 'yellow');
    } else {
      this.log('❌ PROJECT NEEDS MAJOR FIXES', 'red');
    }

    this.log('\n📋 Next Steps:', 'cyan');
    if (this.errors.length > 0) {
      this.log('1. Fix critical errors listed above', 'yellow');
      this.log('2. Re-run validation script', 'yellow');
    }
    if (this.warnings.length > 0) {
      this.log('3. Address warnings for optimal setup', 'yellow');
    }
    this.log('4. Begin implementing UPDATE_CHECKLIST.md features', 'green');
    this.log('5. Run tests regularly during development', 'green');
  }

  async run() {
    this.log('🚀 Starting DASHED OS Project Validation', 'cyan');
    this.log('='.repeat(50), 'cyan');

    await this.validateProjectStructure();
    await this.validateDependencies();
    await this.validateAPIRoutes();
    await this.validatePages();
    await this.validateComponents();
    await this.validateEnvironment();
    await this.validateDocumentation();
    await this.runTypeScript();
    await this.runLinter();
    
    // Only run build test if no critical errors
    if (this.errors.length < 3) {
      await this.testBuild();
    } else {
      this.warning('Skipping build test due to critical errors');
    }

    await this.generateReport();
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new ProjectValidator();
  validator.run().catch(console.error);
}

module.exports = ProjectValidator;
