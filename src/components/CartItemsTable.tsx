import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartItemsTableProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const CartItemsTable: React.FC<CartItemsTableProps> = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Itens do Carrinho</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço Unitário
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subtotal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ação
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-16 h-16">
                      <img
                        src={item.imgUrl}
                        alt={item.nome}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.nome}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {item.descricao}
                      </div>
                      <div className="text-xs text-gray-400">
                        {item.unit}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(item.preco)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center border border-gray-300 rounded-md w-fit">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantidade - 1)}
                      className="p-2 hover:bg-gray-100 transition-colors rounded-l-md"
                      disabled={item.quantidade <= 1}
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <input
                      type="number"
                      value={item.quantidade}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      className="w-16 text-center text-sm border-0 focus:ring-0 py-2"
                      min="1"
                    />
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantidade + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors rounded-r-md"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(item.preco * item.quantidade)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800 transition-colors p-2 hover:bg-red-50 rounded-md"
                    title="Remover item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartItemsTable;