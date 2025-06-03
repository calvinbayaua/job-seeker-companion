# 💼 Job Seeker's Companion

**Job Seeker's Companion** is a web application designed to support job seekers in streamlining their job application process. The platform provides essential tools that help users track their applications, gain strategic insights, and manage cover letters efficiently.

## 📖 Project Purpose
This project was born from the need to make the job hunt less overwhelming. By organizing applications and surfacing meaningful analytics, Job Seeker's Companion empowers users to be more intentional and data-driven in their job search.

## 🛠️ Tech Stack
- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## 🎯 Features
1. **📋 Job Application Tracker** *(In-Progress)*  
   Easily log and manage job applications in an interactive and sortable table view.

2. **📊 Analytics Dashboard** *(Planned)*  
   Visualize which job search strategies (e.g. submitting a cover letter, using Easy Apply, job board used) result in the highest response rates.

3. **📝 Cover Letter Filler**  
   Upload a template and fill cover letters quickly and easily.

## 📦 Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/calvinbayaua/job-seekers-companion.git
   cd job-seekers-companion
   ```
2. **Install frontend dependencies:**
   ```sh
   cd .\job-seekers-companion\client
   npm install
   ```
3. **Install backend dependencies:**
   ```sh
   cd .\job-seekers-companion\server
   npm install
   ```
4. **Create .env file:**
   ```sh
   touch .env
   ```
5. **Add your environmen variables:**
   ```sh
   DB_URL=your_mongodb_connection_string
   ```
6. **Start development servers:**
   ```sh
   cd .\job-seekers-companion\client
   npm run dev
   cd .\job-seekers-companion\server
   npm run dev
   ```

