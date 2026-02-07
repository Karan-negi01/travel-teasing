# TravelTeasing - Discover India's Sacred Sites & Hidden Gems

A comprehensive travel tech platform focused on Indian tourism, featuring three main pillars: **Temples**, **Treks**, and **Off-beat Places**. The platform combines discovery with booking services, allowing users to create custom itineraries.

## 🌟 Features

### Discovery Categories

#### 🕉️ Temples
- **Char Dham** (4 sacred pilgrimage sites)
- **12 Jyotirlingas** (Sacred Shiva shrines)
- **Mini Char Dham** (Uttarakhand pilgrimage)
- Other significant temples across India

Each temple includes:
- Detailed history & significance
- Mythological events & legends
- Rituals, customs, and aarti timings
- Prasad offerings
- Temple timings
- Festivals & special days
- Architecture details

#### 🏔️ Treks
Comprehensive trekking information including:
- Difficulty levels (Easy, Moderate, Difficult)
- Best seasons for trekking
- Route maps & itineraries
- Required permits
- Safety guidelines
- Gear recommendations
- Local guide information

Featured treks:
- Valley of Flowers
- Kedarnath Trek
- Roopkund Trek
- Chadar Trek
- And many more...

#### 🌄 Off-beat Places
Hidden gems and less-explored destinations:
- Kasol & Parvati Valley
- Spiti Valley
- Ziro Valley
- Mawlynnong (Asia's cleanest village)
- Majuli Island
- And many more...

Each destination includes:
- Unique cultural experiences
- Local cuisine recommendations
- Activities and attractions
- Best time to visit
- How to reach
- Accommodation options

### 🔍 Search Functionality
- Search across all categories (temples, treks, off-beat places)
- Filter by state, city, or category
- Real-time search results

### 📱 User Features
- Clean, modern, and responsive UI
- Interactive homepage with video background
- Category-wise browsing
- Detailed information pages
- Related recommendations

## 🛠️ Technical Stack

### Frontend
- **Next.js 16** (App Router)
- **React 19**
- **JavaScript**
- **Tailwind CSS 4**
- **React Compiler** (babel-plugin-react-compiler)
- **Heroicons** for icons
- **ESLint** for code quality

### Project Structure
```
travel-teasing/
├── src/
│   ├── app/
│   │   ├── temples/
│   │   │   ├── [id]/
│   │   │   │   └── page.js
│   │   │   └── page.js
│   │   ├── treks/
│   │   │   ├── [id]/
│   │   │   │   └── page.js
│   │   │   └── page.js
│   │   ├── offbeat/
│   │   │   ├── [id]/
│   │   │   │   └── page.js
│   │   │   └── page.js
│   │   ├── search/
│   │   │   └── page.js
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── globals.css
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.js
│   │   │   ├── Banner.js
│   │   │   └── Footer.js
│   │   ├── home/
│   │   │   ├── CharDhamSection.js
│   │   │   ├── JyotirlingaSection.js
│   │   │   ├── TreksSection.js
│   │   │   └── OffbeatSection.js
│   │   ├── temples/
│   │   ├── treks/
│   │   └── offbeat/
│   ├── data/
│   │   ├── temples.js
│   │   ├── treks.js
│   │   ├── offbeat.js
│   │   └── locations.js
│   └── utils/
├── public/
│   ├── images/
│   └── videos/
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd travel-teasing
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production
```bash
npm run build
npm start
```

## 📊 Data Structure

### Temples
Each temple object contains:
- `id`: Unique identifier
- `name`: Temple name
- `state` & `city`: Location details
- `stateId` & `cityId`: For filtering and recommendations
- `category`: Type (4-dham, jyotirlinga, etc.)
- `deity`: Main deity
- `description`: Detailed description
- `mythology`: Mythological significance
- `aartiTimings` & `templeTimings`: Visit timings
- `prasad`: Offerings
- `festivals`: Major festivals
- `bestTime`: Best time to visit

### Treks
Each trek object contains:
- `id`: Unique identifier
- `name`: Trek name
- `state` & `city`: Location
- `difficulty`: Difficulty level
- `duration`: Trek duration
- `distance`: Total distance
- `maxAltitude`: Maximum altitude
- `bestSeason`: Best time for trekking
- `description`: Trek description
- `highlights`: Key highlights
- `itinerary`: Day-by-day plan
- `permits`: Permit requirements
- `gearRequired`: Essential gear list
- `safety`: Safety information

### Off-beat Places
Each place object contains:
- `id`: Unique identifier
- `name`: Place name
- `state` & `city`: Location
- `type`: Type of destination
- `description`: Detailed description
- `bestTime`: Best time to visit
- `howToReach`: Travel information
- `highlights`: Key attractions
- `activities`: Things to do
- `uniqueness`: What makes it special
- `localCuisine`: Local food recommendations
- `nearbyPlaces`: Nearby attractions
- `accommodation`: Stay options
- `avgCost`: Average daily cost

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean and intuitive interface
- **Gradient Backgrounds**: Vibrant color schemes
- **Smooth Animations**: Fade-in effects and transitions
- **Interactive Elements**: Hover effects and clickable cards
- **Video Banner**: Full-screen hero section
- **Custom Scrollbar**: Styled scrollbar with gradient

## 🔜 Future Enhancements

### Phase 2: Backend & Booking
- Node.js + Express API
- MongoDB database integration
- User authentication (JWT)
- Booking system:
  - Hotel booking APIs
  - Transport booking (Bus, Train, Flight)
  - Custom itinerary builder

### Phase 3: User Dashboard
- Track visited places
- Achievement system
- Shareable travel map
- Personal travel history
- Booking history

### Phase 4: Advanced Features
- Recommendation engine
- User reviews and ratings
- Interactive maps
- Travel planning tools
- Social sharing features
- Payment gateway integration

## 📝 Development Notes

### Current Status
✅ Frontend structure complete
✅ Homepage with all sections
✅ Individual detail pages for all categories
✅ Search functionality
✅ Responsive design
✅ Comprehensive data for temples, treks, and off-beat places

### Pending
- Real images (currently using gradient placeholders)
- Video content for banner
- Backend API development
- Database integration
- Booking system
- User authentication

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 📧 Contact

For any queries or suggestions, please reach out to:
- Email: info@travelteasing.com
- Website: [TravelTeasing](https://travelteasing.com)

---

**Built with ❤️ for travelers exploring India**
