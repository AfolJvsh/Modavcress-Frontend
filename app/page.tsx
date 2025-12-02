import Header from '@/components/Header';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

export default function Home() {
  
  return (
    <>
   

  <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="flex flex-1 justify-center p-4 sm:p-6 lg:p-8">
          <div className="flex w-full max-w-4xl flex-col gap-8">
            <TaskForm />
            <TaskList />
          </div>
        </main>
      </div>
    </div>   </>
  );
}
