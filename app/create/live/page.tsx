
import LiveSetupForm from './LiveSetupForm';
import BottomTabBar from '../../../components/BottomTabBar';

export default function GoLivePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LiveSetupForm />
      <BottomTabBar />
    </div>
  );
}
