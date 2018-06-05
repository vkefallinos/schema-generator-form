export default {
  "definitions": {
    "scalars": {
      "type": "string",
      "enum": ["ID",
        "String",
        "Integer",
        "Float",
        "Boolean",
        "DateTime",
        "JSON",
        "Enum",
        "File",
        "OneToOne",
        "OneToMany",
        "ManyToMany",
      ]

    },
    "models": {
      type: "string",
      enum: []
    },
    "Query": {
      type: "object",
      properties: {
        type: {
          $ref: "#/definitions/models"
        },
        orderBy: {
          type: "object",
          properties: {
            field: {
              type: "string"
            },
            ascending:{
              type: "boolean"
            }
          }
        },
        filter: {
          type: "array",
          items: {
            $ref: "#/definitions/FilteredField"
          }
        }
      }
    },
    FilteredField: {
      type: "object",
      properties: {
        field: {
          type: "string"
        },
        criteria: {
          type: "string",
          enum: [
            "in",
            "not_in",
            "starts_with",
            "not_starts_with",
            "ends_with",
            "not_ends_with",
            "contains",
            "not_contains"
          ]
        },
        value: {
          type: "string"
        }
      }
    },
    "Page": {
      type: "object",
      properties: {
        authenticated: {
          type: "boolean"
        },
        route: {
          type: "string"
        },
        queries: {
          type: "array",
          items: {
            "$ref": "#/definitions/Query"
          }
        }
      }
    },
    "Function": {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["code", "webhook"]
        }
      },
      dependencies: {
        type: {
          oneOf: [
            {
              properties: {
                type: {
                  "enum": [
                    "code"
                  ]
                },
                code: {
                  type: "string"
                }
              }
            },
            {
              properties: {
                type: {
                  "enum": [
                    "webhook"
                  ]
                },
                webhook: {
                  type: "string"
                }
              }
            }
          ]
        },
      }
    },
    "Operation": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "before": {
          $ref: "#/definitions/Function"
        },
        "after": {
          $ref: "#/definitions/Function"
        }
      },

    },
    "Model": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "plural": {
          "type": "string"
        },
        "properties": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Property"
          }
        },
        "operations": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Operation"
          }
        }
      }
    },
    "Property": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "type": {
          "$ref": "#/definitions/scalars",
        },
        "isUnique": {
          "type": "boolean"
        },
        "isRequired": {
          "type": "boolean"
        },
      },
      "dependencies": {
        "type": {
          "oneOf": [{
            "properties": {
              "type": {
                "enum": [
                  "OneToOne",
                  "OneToMany",
                  "ManyToMany"
                ]
              },
              "relation": {
                "$ref": "#/definitions/models",
              },
              "relationName": {
                "type": "string",
              }
            }
          },
          ]
        }
      }
    }
  },
}