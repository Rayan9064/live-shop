
import ProductCreateForm from './ProductCreateForm';
import BottomTabBar from '../../../components/BottomTabBar';

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductCreateForm />
      <BottomTabBar />
    </div>
  );
}
