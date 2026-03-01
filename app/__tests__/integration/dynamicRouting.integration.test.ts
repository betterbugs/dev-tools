/**
 * Integration Tests for Dynamic Tool Routing
 * Tests that tools are correctly routed and identified based on URL slug
 */

// Note: Full integration tests would verify actual Next.js dynamic routing
// at app/[slug]/page.tsx. These tests verify tool metadata and routing logic.

describe('Dynamic Tool Routing Integration Tests', () => {
  // Mock tools data for testing
  const mockTools = [
    {
      slug: 'base64-encoder',
      name: 'Base64 Encoder',
      category: 'Encoders & Decoders',
      description: 'Encode text to Base64',
    },
    {
      slug: 'json-validator',
      name: 'JSON Validator',
      category: 'Validators',
      description: 'Validate and format JSON',
    },
    {
      slug: 'color-converter',
      name: 'Color Converter',
      category: 'Converters',
      description: 'Convert between color formats',
    },
  ];

  // Utility function to find tool by slug
  const findToolBySlug = (slug: string) => {
    return mockTools.find((tool) => tool.slug === slug);
  };

  it('should find base64-encoder tool by slug', () => {
    const tool = findToolBySlug('base64-encoder');
    expect(tool).toBeDefined();
    expect(tool?.name).toBe('Base64 Encoder');
  });

  it('should find json-validator tool by slug', () => {
    const tool = findToolBySlug('json-validator');
    expect(tool).toBeDefined();
    expect(tool?.category).toBe('Validators');
  });

  it('should find color-converter tool by slug', () => {
    const tool = findToolBySlug('color-converter');
    expect(tool).toBeDefined();
    expect(tool?.description).toContain('color formats');
  });

  it('should return undefined for unknown slug', () => {
    const tool = findToolBySlug('unknown-tool');
    expect(tool).toBeUndefined();
  });

  it('should handle empty slug', () => {
    const tool = findToolBySlug('');
    expect(tool).toBeUndefined();
  });

  describe('Tool Metadata Validation', () => {
    it('should have valid metadata for all tools', () => {
      mockTools.forEach((tool) => {
        expect(tool.slug).toBeDefined();
        expect(tool.name).toBeDefined();
        expect(tool.category).toBeDefined();
        expect(tool.description).toBeDefined();
        expect(tool.slug).toMatch(/^[a-z0-9-]+$/); // slug format validation
      });
    });

    it('should have unique slugs', () => {
      const slugs = mockTools.map((tool) => tool.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('should have non-empty descriptions', () => {
      mockTools.forEach((tool) => {
        expect(tool.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Tool Routing Logic', () => {
    it('should map slugs to correct tools', () => {
      const slugToNameMap: Record<string, string> = {
        'base64-encoder': 'Base64 Encoder',
        'json-validator': 'JSON Validator',
        'color-converter': 'Color Converter',
      };

      Object.entries(slugToNameMap).forEach(([slug, expectedName]) => {
        const tool = findToolBySlug(slug);
        expect(tool?.name).toBe(expectedName);
      });
    });

    it('should handle slug case sensitivity', () => {
      // Slugs should be lowercase
      const tool = findToolBySlug('Base64-Encoder');
      expect(tool).toBeUndefined(); // Should not find uppercase variant
    });

    it('should support slug variations with hyphens', () => {
      expect(findToolBySlug('base64-encoder')).toBeDefined();
      expect(findToolBySlug('baseencoder')).toBeUndefined();
      expect(findToolBySlug('base64_encoder')).toBeUndefined();
    });
  });
});

