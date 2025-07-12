# DASHED Documentation Guidelines

## Overview
This document establishes the organizational structure and standards for DASHED project documentation.

## Documentation Structure

### Root Documentation (`/docs`)
The `/docs` folder contains the core project documentation organized by purpose and development phases.

#### Core Documentation Files
- `README.md` - Project overview and quick start guide
- `guidelines.md` - This file - documentation standards and organization
- `architecture.md` - System architecture and design decisions
- `developer-guide.md` - Development setup and contribution guidelines
- `api-reference.md` - Complete API documentation
- `setup-guide.md` - Installation and configuration instructions
- `admin-user-guide.md` - Admin interface user documentation
- `troubleshooting-guide.md` - Common issues and solutions

### Patch Documentation (`/docs/patches`)
Development phases are organized into patches, each representing a major feature increment.

#### Patch Folder Structure
```
/docs/patches/
├── patch-0/          # Backend foundation
├── patch-1/          # Admin dashboard & management
├── patch-2/          # [Future patch]
└── patch-n/          # [Progressive numbering]
```

#### Required Files Per Patch
Each `/docs/patches/patch-n/` folder must contain:
- `PATCHN_CHECKLIST.md` - Implementation checklist and progress tracking
- `PATCHN_SUMMARY.md` - Summary of features, changes, and outcomes

#### Patch-Specific Documentation
- **Patch-0**: Backend development, infrastructure, database design
- **Patch-1**: Admin dashboard, product management, user interface
- **Patch-N**: Each subsequent patch focuses on specific feature sets

### Batch Documentation (`/docs/batches`)
For grouping multiple patches into larger release cycles.

#### Batch Folder Structure
```
/docs/batches/
├── batch-1/          # First major release
├── batch-2/          # Second major release
└── batch-n/          # [Progressive numbering]
```

#### Required Files Per Batch
Each `/docs/batches/batch-n/` folder must contain:
- `BATCHN_CHECKLIST.md` - Batch-level checklist and coordination
- `BATCHN_SUMMARY.md` - Release notes and comprehensive summary

## Documentation Standards

### File Naming Conventions
- Use kebab-case for general documentation: `api-reference.md`
- Use UPPERCASE for checklists and summaries: `PATCH1_CHECKLIST.md`
- Use progressive numbering for patches and batches: `patch-1`, `batch-2`

### Content Standards
- All markdown files must use proper heading hierarchy (H1 → H2 → H3)
- Include table of contents for documents > 50 lines
- Use checkboxes `[x]` for completion tracking
- Include implementation dates and status indicators
- Maintain consistent formatting and style

### Organization Principles
1. **Centralization**: All documentation lives in `/docs`
2. **Chronological**: Patches follow sequential numbering
3. **Hierarchical**: Batches group related patches
4. **Standardized**: Consistent file naming and structure
5. **Comprehensive**: Complete coverage of features and changes

### Maintenance Guidelines
- Update documentation alongside code changes
- Archive outdated documentation with clear deprecation notices
- Review and update guidelines as project evolves
- Ensure all links remain functional across reorganizations

## Migration Notes
When reorganizing existing documentation:
1. Preserve git history where possible
2. Update all internal links
3. Create redirects for external references
4. Validate all cross-references
5. Update README files with new structure

## Future Considerations
- Consider automated documentation generation for API references
- Implement documentation review process
- Plan for internationalization if needed
- Establish documentation versioning strategy

---

*Last Updated: July 2025*
*Version: 1.0.0*
