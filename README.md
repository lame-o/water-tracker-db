# Water Tracker with Supabase Auth

A clean, modern web application that demonstrates user authentication and data management using Supabase. Users can track their daily water intake with a beautiful, responsive interface.

![Water Tracker Demo](screenshot.png)

## Features

- 🔐 User Authentication (Sign up, Sign in, Sign out)
- 💧 Daily Water Intake Tracking
- 📊 Real-time Updates
- 🎨 Modern, Responsive UI
- 🔒 Row Level Security with Supabase

## Live Demo

[View Live Demo](#) <!-- Add your deployed version link here -->

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/water-tracker-supabase.git
   cd water-tracker-supabase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [Supabase](https://supabase.com)
   - Create a new table called `water_intake` with the following schema:
     ```sql
     id: uuid (primary key)
     user_id: uuid (foreign key to auth.users.id)
     date: date
     cups: int8
     created_at: timestamptz
     ```
   - Set up Row Level Security (RLS) policy:
     ```sql
     create policy "Enable all operations for users based on user_id"
     on "public"."water_intake"
     as permissive
     for all 
     to public
     using (auth.uid() = user_id)
     with check (auth.uid() = user_id);
     ```

4. **Configure environment**
   - Open `auth.js`
   - Replace `YOUR_SUPABASE_URL` with your project URL
   - Replace `YOUR_SUPABASE_ANON_KEY` with your anon key

5. **Run the application**
   ```bash
   npm start
   ```

## Project Structure

```
water-tracker-supabase/
├── index.html      # Main HTML file with UI components
├── auth.js         # Authentication and water tracking logic
├── package.json    # Project dependencies
└── README.md       # Project documentation
```

## Technologies Used

- [Supabase](https://supabase.com) - Backend and Authentication
- HTML5 & CSS3 - Frontend structure and styling
- JavaScript - Client-side logic
- [Live Server](https://www.npmjs.com/package/live-server) - Development server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Supabase Documentation](https://supabase.com/docs)
- [Modern CSS Reset](https://piccalil.li/blog/a-modern-css-reset/)

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/water-tracker-supabase](https://github.com/yourusername/water-tracker-supabase)
