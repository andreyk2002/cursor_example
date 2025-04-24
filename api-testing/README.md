# Fake Store API Testing Script

This Python script performs automated testing of the [Fake Store API](https://fakestoreapi.com/products) to validate product data integrity. It checks for common data quality issues and provides detailed reporting of any defects found.

## Features

- Validates HTTP response status code
- Checks product data for:
  - Non-empty product titles
  - Non-negative prices
  - Valid rating values (≤ 5)
- Generates detailed reports of any data defects
- Clear console output with visual indicators

## Prerequisites

- Python 3.6 or higher
- pip (Python package installer)

## Installation

1. Clone or download this repository
2. Create a virtual environment (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use: venv\Scripts\activate
   ```

3. Install required packages:
   ```bash
   python3 -m pip install requests pytest
   ```

## Usage

1. Make sure you're in the project directory and your virtual environment is activated
2. Run the script:
   ```bash
   python3 test_fakestore_api.py
   ```

## Output Format

The script will display:
- HTTP status validation result
- List of any products with defects, including:
  - Product ID
  - Specific defects found (Empty title, Invalid price, or Rating exceeds 5)

Example output:
```
Starting API validation tests...
--------------------------------------------------
✅ HTTP Status validation passed

Validation Results:
--------------------------------------------------
❌ Found 2 products with defects:

Product ID: 1
  - Empty title

Product ID: 3
  - Rating exceeds 5
```

## Validation Rules

The script validates the following rules for each product:

1. **Title Validation**
   - Must be a non-empty string
   - Cannot be whitespace-only

2. **Price Validation**
   - Must be a number (integer or float)
   - Must be non-negative

3. **Rating Validation**
   - If present, must be a number
   - Must be less than or equal to 5

## Error Handling

The script includes error handling for:
- Network connectivity issues
- Invalid JSON responses
- HTTP status code errors
- Missing or malformed data fields

## Contributing

Feel free to submit issues and enhancement requests! 