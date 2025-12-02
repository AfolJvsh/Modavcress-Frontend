# Task Manager

A modern, responsive task management application built with **Next.js 16**, **React 19**, and **TypeScript**. Manage your daily tasks with an intuitive interface featuring real-time updates, task filtering, and a beautiful dark mode.

---

## 🚀 Tech Stack

- **Next.js 16** - React framework for production with Server-Side Rendering (SSR) and API optimization
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe JavaScript for better code quality
- **Tailwind CSS 4** - Utility-first CSS framework for rapid UI development
- **Lucide React** - Beautiful, consistent SVG icon library
- **Next.js Server Actions** - Secure server-side function calls from the client

---

## 📁 Project Structure

```
components/
├── TaskForm.tsx           # Form to create new tasks
├── TaskList.tsx           # Main component to display all tasks
├── TaskItem.tsx           # Individual task card component
├── EditTaskModal.tsx      # Modal for editing existing tasks
├── TaskMenu.tsx           # Context menu for task actions
├── StatusBadge.tsx        # Badge showing task status
├── ToggleSwitch.tsx       # Switch to toggle task completion
└── Header.tsx             # Application header

lib/
└── actions/
    └── task.actions.ts    # Server actions for all API calls

app/
├── page.tsx               # Main dashboard page
├── layout.tsx             # Root layout with metadata
└── globals.css            # Global styles and Tailwind imports
```

### Key Files

| File | Purpose |
|------|---------|
| `lib/actions/task.actions.ts` | Server actions for creating, updating, deleting, and fetching tasks |
| `components/TaskList.tsx` | Main container component that manages task state and handles operations |
| `components/TaskForm.tsx` | Form component for creating new tasks |
| `components/EditTaskModal.tsx` | Modal dialog for editing existing tasks |
| `components/TaskItem.tsx` | Individual task card with status, title, and action buttons |

---

## 🛠️ Setup Instructions

### Prerequisites

Before you begin, make sure you have:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Usually comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd task-manager
```

### Step 2: Install Dependencies

Install all required packages using npm:

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory of the project:

```bash
# Windows PowerShell
New-Item .env.local -Type File

# Or create it manually in your editor
```

Add the following environment variable:

```env
NEXT_PUBLIC_API_BASE_URL=http://task-manager.test/api
```

**Note:** Update the URL if your backend API is hosted on a different domain or port.

### Step 4: Run the Development Server

Start the development server with:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` in your browser.

### Build for Production

To create an optimized production build:

```bash
npm run build
npm start
```

---

## 📖 Usage Instructions

### Creating a Task

1. Navigate to the **"Create New Task"** section at the top of the dashboard
2. Enter your task title (e.g., "Design the new login page")
3. Select a status from the dropdown:
   - **To Do** - New tasks
   - **In Progress** - Tasks you're currently working on
   - **Done** - Completed tasks
4. Click the **"Create Task"** button
5. The task will appear in your task list below

### Viewing Tasks

- All tasks are displayed in the **"Your Tasks"** section
- Each task card shows:
  - **Status Badge** - Color-coded indicator (To Do, In Progress, Done)
  - **Task Title** - The task name (completed tasks appear with strikethrough)
  - **Toggle Switch** - Quick way to mark a task as complete
  - **Menu Icon** - Additional actions

### Editing a Task

1. Locate the task you want to edit
2. Click the **menu icon** (three dots) on the right side of the task card
3. Select **"Edit"** from the menu
4. In the modal dialog:
   - Update the task title if needed
   - Change the status to a different value
5. Click **"Save"** to apply the changes
6. The task list updates automatically

### Marking Tasks as Complete

**Quick Toggle:**
- Click the **toggle switch** on the right side of any task to instantly mark it as complete or incomplete

**Via Edit Modal:**
- Click the menu icon and select "Edit"
- Change the status to "Done"
- Click "Save"

Completed tasks display with a strikethrough text and a different color.

### Deleting a Task

1. Click the **menu icon** (three dots) on the right side of the task card
2. Select **"Delete"** from the menu
3. Confirm the deletion when prompted
4. The task is removed from your list permanently

---

## 🔧 Technical Features

### Server Actions

This application uses **Next.js Server Actions** to securely communicate with the backend API. Server Actions:

- Run on the server, keeping your API endpoints safe
- Automatically handle data fetching and mutation
- Reduce client-side JavaScript bundle size
- Provide a seamless user experience with `revalidatePath()` for automatic UI updates

All task operations use Server Actions defined in `lib/actions/task.actions.ts`:

```typescript
// Fetch all tasks from the API
getAllTasks()

// Create a new task
createTask(title, status)

// Update an existing task
updateTask(id, title, status)

// Delete a task
deleteTask(id)
```

### Auto-Refresh

When you create, update, or delete a task:
1. The Server Action processes the request on the server
2. The API is called with the new data
3. The cache is revalidated using `revalidatePath('/')`
4. The component state updates immediately
5. The UI reflects the changes without requiring a page refresh

### Error Handling

The application includes robust error handling:
- Network errors are caught and displayed to the user
- Validation errors are shown in the task form
- Failed operations display helpful error messages
- Loading states prevent duplicate submissions

### Responsive Design

The Task Manager is fully responsive:
- **Mobile** - Optimized single-column layout
- **Tablet** - Adjusted spacing and sizing
- **Desktop** - Full-width display with hover effects
- **Dark Mode** - Automatically follows system preferences

---

## 🎨 Styling

The project uses **Tailwind CSS** for styling:

- **Utility-first approach** - Classes compose styles without writing custom CSS
- **Dark mode support** - Built-in dark theme that respects system preferences
- **Customizable** - Edit `tailwind.config.ts` to customize colors and spacing
- **Responsive** - Mobile-first design with `sm:`, `md:`, `lg:` breakpoints

---

## 📝 Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server on localhost:3000 |
| `npm run build` | Create an optimized production build |
| `npm start` | Start production server (requires build first) |
| `npm run lint` | Run ESLint to check code quality |

---

## 🐛 Troubleshooting

### Issue: Tasks don't load

**Solution:** 
- Check that your backend API is running
- Verify the `NEXT_PUBLIC_API_BASE_URL` in `.env.local` is correct
- Open browser DevTools (F12) and check the Network tab for failed requests

### Issue: Changes don't appear after action

**Solution:**
- The app automatically refreshes the task list after any operation
- If it doesn't update, try refreshing the browser page with `Ctrl+R` (or `Cmd+R` on Mac)

### Issue: "Failed to fetch tasks" error

**Solution:**
- Ensure your backend API is accessible at the configured URL
- Check CORS settings in your backend if requests are blocked
- Verify network connectivity

---


