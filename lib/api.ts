import axios from 'axios';
import { Product } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function getProducts(page: number = 1, limit: number = 10): Promise<{ products: Product[], totalPages: number }> {
  const response = await axios.get(`${API_URL}/products?page=${page}&limit=${limit}`);
  return response.data;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const response = await axios.get(`${API_URL}/products/search?q=${query}`);
  return response.data;
}