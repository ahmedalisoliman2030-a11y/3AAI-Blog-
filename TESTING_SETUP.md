# Testing Setup Instructions

## Install Test Dependencies

Before running the tests, you need to install the testing dependencies:

```bash
cd flaky-field
npm install
```

This will install:
- `vitest` - Testing framework
- `fast-check` - Property-based testing library

## Running Tests

### Run all tests once:
```bash
npm test
```

### Run tests in watch mode:
```bash
npm run test:watch
```

### Run specific test file:
```bash
npx vitest run src/utils/search.test.ts
```

## Test Files

The following property-based tests have been implemented:

1. **src/utils/search.test.ts** - Search and filter functionality tests
   - Property 6: نتائج البحث (Search Results)
   - Property 7: تصفية حسب التصنيف (Filter by Category)
   - Property 8: تصفية حسب الوسم (Filter by Tag)
   - Property 24: البحث بالعربية (Arabic Search)

Each test runs 100 iterations to verify the properties hold across random inputs.
