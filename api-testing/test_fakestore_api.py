import requests
import json
from typing import List, Dict, Any

class ProductValidator:
    def __init__(self):
        self.api_url = "https://fakestoreapi.com/products"
        self.defects = []

    def validate_http_status(self) -> bool:
        """Validate that the HTTP status code is 200 OK."""
        try:
            response = requests.get(self.api_url)
            if response.status_code != 200:
                self.defects.append(f"HTTP Status Error: Expected 200, got {response.status_code}")
                return False
            return True
        except requests.RequestException as e:
            self.defects.append(f"HTTP Request Error: {str(e)}")
            return False

    def validate_product(self, product: Dict[str, Any]) -> List[str]:
        """Validate individual product data and return list of defects."""
        product_defects = []
        
        # Validate title
        if not isinstance(product.get('title'), str) or not product.get('title').strip():
            product_defects.append("Empty title")
        
        # Validate price
        price = product.get('price')
        if not isinstance(price, (int, float)) or price < 0:
            product_defects.append("Invalid price")
        
        # Validate rating
        rating = product.get('rating', {}).get('rate')
        if rating is not None and (not isinstance(rating, (int, float)) or rating > 5):
            product_defects.append("Rating exceeds 5")
        
        return product_defects

    def run_tests(self) -> None:
        """Run all validation tests and print results."""
        print("Starting API validation tests...")
        print("-" * 50)

        # Validate HTTP status
        if not self.validate_http_status():
            print("❌ HTTP Status validation failed")
            return

        print("✅ HTTP Status validation passed")
        
        # Get products data
        try:
            response = requests.get(self.api_url)
            products = response.json()
        except (requests.RequestException, json.JSONDecodeError) as e:
            print(f"❌ Error fetching products: {str(e)}")
            return

        # Validate each product
        invalid_products = []
        for product in products:
            defects = self.validate_product(product)
            if defects:
                invalid_products.append({
                    'id': product.get('id'),
                    'defects': defects
                })

        # Print results
        print("\nValidation Results:")
        print("-" * 50)
        
        if not invalid_products:
            print("✅ All products passed validation!")
        else:
            print(f"❌ Found {len(invalid_products)} products with defects:")
            for product in invalid_products:
                print(f"\nProduct ID: {product['id']}")
                for defect in product['defects']:
                    print(f"  - {defect}")

def main():
    validator = ProductValidator()
    validator.run_tests()

if __name__ == "__main__":
    main() 