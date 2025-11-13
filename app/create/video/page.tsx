
import VideoUploadForm from './VideoUploadForm';
import BottomTabBar from '../../../components/BottomTabBar';

export default function VideoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <VideoUploadForm />
      <BottomTabBar />
    </div>
  );
}
