

// Two separate queries in one function - one put to update the boolean to true, and one post to add the date tot he habit_log

function DailyPage() {

  const d = new Date();
  let day = d.getDay();

  return (
    <div>
      <h1>Day of The Week Placeholder</h1>

    </div>
  )
};

export default DailyPage;