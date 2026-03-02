/**
 * JSON validation and formatting utilities
 */

export interface JSONValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats?: {
    totalKeys: number;
    maxDepth: number;
    dataTypes: Record<string, number>;
  };
}

export const validateJSON = (jsonString: string): JSONValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!jsonString.trim()) {
    return {
      isValid: false,
      errors: ['JSON string is empty'],
      warnings: [],
    };
  }

  try {
    const parsed = JSON.parse(jsonString);

    // Analyze the structure
    const stats = analyzeJSON(parsed);

    // Check for common issues that can occur in valid JSON
    // Warn on excessively deep or large JSON structures to help catch
    // inputs that may impact performance or readability.
    if (stats.maxDepth > 50) {
      warnings.push('JSON is highly nested (depth > 50), which may impact performance or readability');
    }

    const MAX_KEYS_WARNING_THRESHOLD = 10000;
    if (stats.totalKeys > MAX_KEYS_WARNING_THRESHOLD) {
      warnings.push(`JSON contains a large number of keys (${stats.totalKeys}), which may impact performance`);
    }
    return {
      isValid: true,
      errors: [],
      warnings,
      stats,
    };
  } catch (error: any) {
    errors.push(`Syntax Error: ${error.message}`);
    return {
      isValid: false,
      errors,
      warnings,
    };
  }
};

export const analyzeJSON = (obj: any): { totalKeys: number; maxDepth: number; dataTypes: Record<string, number> } => {
  const dataTypes: Record<string, number> = {
    string: 0,
    number: 0,
    boolean: 0,
    null: 0,
    array: 0,
    object: 0,
  };

  let totalKeys = 0;
  let maxDepth = 0;

  const traverse = (value: any, depth: number = 0) => {
    maxDepth = Math.max(maxDepth, depth);

    if (value === null) {
      dataTypes.null = (dataTypes.null || 0) + 1;
    } else if (Array.isArray(value)) {
      dataTypes.array = (dataTypes.array || 0) + 1;
      value.forEach((item) => traverse(item, depth + 1));
    } else if (typeof value === 'object') {
      dataTypes.object = (dataTypes.object || 0) + 1;
      Object.keys(value).forEach((key) => {
        totalKeys++;
        traverse(value[key], depth + 1);
      });
    } else if (typeof value === 'string') {
      dataTypes.string = (dataTypes.string || 0) + 1;
    } else if (typeof value === 'number') {
      dataTypes.number = (dataTypes.number || 0) + 1;
    } else if (typeof value === 'boolean') {
      dataTypes.boolean = (dataTypes.boolean || 0) + 1;
    }
  };

  traverse(obj);
  return { totalKeys, maxDepth, dataTypes };
};

export const formatJSON = (jsonString: string, indent: number = 2): { formatted: string; error: string | null } => {
  try {
    const parsed = JSON.parse(jsonString);
    const formatted = JSON.stringify(parsed, null, indent);
    return { formatted, error: null };
  } catch (error: any) {
    return { formatted: '', error: error.message };
  }
};

export const minifyJSON = (jsonString: string): { minified: string; error: string | null } => {
  try {
    const parsed = JSON.parse(jsonString);
    const minified = JSON.stringify(parsed);
    return { minified, error: null };
  } catch (error: any) {
    return { minified: '', error: error.message };
  }
};
