---
name: Pull Request
about: Submit changes to DASHED
title: ''
labels: []
assignees: ''
---

## Description
Brief description of changes made in this PR.

## Related Issues
Fixes #(issue number)
Closes #(issue number)
Relates to #(issue number)

## Type of Change
Please delete options that are not relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring
- [ ] Security fix
- [ ] Dependency update

## Changes Made
Detailed list of changes:

- Change 1: [Description]
- Change 2: [Description]
- Change 3: [Description]

## Testing
Describe the tests that you ran to verify your changes.

### Test Configuration
- **Node.js version**: [e.g. 18.x]
- **Browser tested**: [e.g. Chrome, Firefox, Safari]
- **Operating System**: [e.g. macOS, Windows, Linux]

### Test Cases
- [ ] All existing tests pass
- [ ] New tests added for new functionality
- [ ] Manual testing completed
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness tested

### Test Results
```
Paste test output here if relevant
```

## Screenshots
If applicable, add screenshots to help explain your changes.

**Before:**
[Screenshot or description of before state]

**After:**
[Screenshot or description of after state]

## Performance Impact
Describe any performance implications of your changes:

- [ ] No performance impact
- [ ] Performance improvement
- [ ] Minor performance impact (acceptable)
- [ ] Significant performance impact (needs discussion)

### Performance Metrics
If you have performance measurements, include them here:

```
Performance metrics or benchmark results
```

## Security Considerations
Have you considered the security implications of your changes?

- [ ] No security impact
- [ ] Security improvement
- [ ] Potential security considerations addressed
- [ ] Security review needed

## Breaking Changes
If this is a breaking change, describe:

1. **What breaks**: [Description]
2. **Migration path**: [How users can update their code]
3. **Deprecation timeline**: [When old functionality will be removed]

## Documentation
- [ ] Documentation updated (if applicable)
- [ ] README updated (if applicable)
- [ ] API documentation updated (if applicable)
- [ ] Comments added to complex code

## Dependencies
- [ ] No new dependencies
- [ ] New dependencies added (listed below)
- [ ] Dependencies updated (listed below)
- [ ] Dependencies removed (listed below)

### New/Updated Dependencies
List any new or updated dependencies:
- dependency-name@version: [reason for addition/update]

## Accessibility
- [ ] No accessibility impact
- [ ] Accessibility improvements made
- [ ] Accessibility testing completed
- [ ] Screen reader testing done

## Deployment Notes
Any special deployment considerations:

- [ ] No special deployment requirements
- [ ] Database migrations required
- [ ] Environment variables need updating
- [ ] Special deployment order required
- [ ] Post-deployment verification steps needed

### Environment Variables
List any new environment variables:
```
NEW_ENVIRONMENT_VARIABLE=description
```

## Rollback Plan
How can this change be rolled back if needed?

- [ ] Simple git revert
- [ ] Requires database rollback
- [ ] Requires configuration changes
- [ ] Cannot be easily rolled back

## Checklist
Please review and check all applicable items:

### Code Quality
- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Code is well-commented, particularly complex areas
- [ ] No console.log statements left in code
- [ ] No TODO comments left without issues

### Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated (if applicable)
- [ ] All tests pass locally
- [ ] Test coverage maintained or improved

### Documentation
- [ ] Corresponding changes to documentation made
- [ ] JSDoc comments added to new functions
- [ ] README updated if needed
- [ ] CHANGELOG updated

### Security
- [ ] No sensitive information exposed
- [ ] Input validation added where needed
- [ ] Authentication/authorization respected
- [ ] SQL injection prevention considered

### Performance
- [ ] Performance impact assessed
- [ ] No unnecessary re-renders introduced
- [ ] Database queries optimized
- [ ] Bundle size impact considered

## Review Checklist for Maintainers
- [ ] Code review completed
- [ ] Security review completed (if needed)
- [ ] Performance review completed (if needed)
- [ ] Documentation review completed
- [ ] Test coverage review completed

## Additional Notes
Any additional information that reviewers should know:

---

## For Maintainers

### Merge Criteria
- [ ] All CI checks pass
- [ ] At least one approval from a maintainer
- [ ] No requested changes pending
- [ ] Branch is up to date with main
- [ ] Squash merge preferred (unless preserving commit history is important)

### Post-Merge Actions
- [ ] Delete feature branch
- [ ] Update project board
- [ ] Create release notes (if applicable)
- [ ] Monitor deployment
- [ ] Close related issues
