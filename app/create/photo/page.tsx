
import PhotoUploadForm from './PhotoUploadForm';
import BottomTabBar from '../../../components/BottomTabBar';

export default function PhotoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PhotoUploadForm />
      <BottomTabBar />
    </div>
  );
}
