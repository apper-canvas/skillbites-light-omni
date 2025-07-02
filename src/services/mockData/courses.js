export const mockCourses = [
  {
    Id: 1,
    title: "JavaScript Fundamentals for Beginners",
    description: "Learn the basics of JavaScript programming with hands-on exercises and real-world examples. Perfect for absolute beginners who want to start their coding journey.",
    price: 49.99,
    currency: "USD",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop",
    category: "Technology",
    duration: 180,
    sections: [
      {
        id: "1",
        type: "video",
        title: "Introduction to JavaScript",
        order: 0,
        content: {
          url: "https://example.com/video1.mp4",
          duration: 600,
          thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=200&h=113&fit=crop"
        }
      },
      {
        id: "2",
        type: "pdf",
        title: "JavaScript Cheat Sheet",
        order: 1,
        content: {
          url: "https://example.com/cheatsheet.pdf",
          pages: 5,
          size: 2.3
        }
      },
      {
        id: "3",
        type: "quiz",
        title: "Variables and Functions Quiz",
        order: 2,
        content: {
          questions: [
            {
              id: "q1",
              question: "What keyword is used to declare a variable in JavaScript?",
              type: "multiple",
              options: ["var", "let", "const", "All of the above"],
              correctAnswer: 3,
              points: 1
            }
          ]
        }
      }
    ],
    enrollmentCount: 234,
    rating: 4.8,
    status: "published",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:22:00Z"
  },
  {
    Id: 2,
    title: "Digital Marketing Mastery",
    description: "Master the art of digital marketing with proven strategies for social media, email campaigns, and SEO optimization.",
    price: 79.99,
    currency: "USD",
    thumbnail: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=225&fit=crop",
    category: "Marketing",
    duration: 240,
    sections: [
      {
        id: "4",
        type: "video",
        title: "Digital Marketing Overview",
        order: 0,
        content: {
          url: "https://example.com/marketing-intro.mp4",
          duration: 720,
          thumbnail: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=200&h=113&fit=crop"
        }
      },
      {
        id: "5",
        type: "video",
        title: "Social Media Strategy",
        order: 1,
        content: {
          url: "https://example.com/social-media.mp4",
          duration: 900,
          thumbnail: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=200&h=113&fit=crop"
        }
      },
      {
        id: "6",
        type: "pdf",
        title: "Marketing Templates Pack",
        order: 2,
        content: {
          url: "https://example.com/templates.pdf",
          pages: 25,
          size: 8.7
        }
      }
    ],
    enrollmentCount: 156,
    rating: 4.6,
    status: "published",
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T16:45:00Z"
  },
  {
    Id: 3,
    title: "Photoshop for Designers",
    description: "Learn professional photo editing and design techniques using Adobe Photoshop. From basic tools to advanced compositing.",
    price: 89.99,
    currency: "USD",
    thumbnail: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=400&h=225&fit=crop",
    category: "Design",
    duration: 320,
    sections: [
      {
        id: "7",
        type: "video",
        title: "Photoshop Interface Tour",
        order: 0,
        content: {
          url: "https://example.com/ps-interface.mp4",
          duration: 450,
          thumbnail: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=200&h=113&fit=crop"
        }
      },
      {
        id: "8",
        type: "video",
        title: "Layer Techniques",
        order: 1,
        content: {
          url: "https://example.com/layers.mp4",
          duration: 680,
          thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=200&h=113&fit=crop"
        }
      }
    ],
    enrollmentCount: 89,
    rating: 4.9,
    status: "published",
    createdAt: "2024-01-12T11:20:00Z",
    updatedAt: "2024-01-19T13:30:00Z"
  },
  {
    Id: 4,
    title: "Business Strategy Fundamentals",
    description: "Develop strategic thinking skills and learn how to create effective business strategies that drive growth and success.",
    price: 99.99,
    currency: "USD",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop",
    category: "Business",
    duration: 275,
    sections: [],
    enrollmentCount: 45,
    rating: 4.4,
    status: "draft",
    createdAt: "2024-01-22T08:45:00Z",
    updatedAt: "2024-01-22T15:12:00Z"
  },
  {
    Id: 5,
    title: "Creative Writing Workshop",
    description: "Unlock your creativity and learn the fundamentals of storytelling, character development, and narrative structure.",
    price: 59.99,
    currency: "USD",
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=225&fit=crop",
    category: "Creative",
    duration: 200,
    sections: [
      {
        id: "9",
        type: "video",
        title: "Finding Your Voice",
        order: 0,
        content: {
          url: "https://example.com/voice.mp4",
          duration: 540,
          thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=200&h=113&fit=crop"
        }
      },
      {
        id: "10",
        type: "pdf",
        title: "Writing Exercises",
        order: 1,
        content: {
          url: "https://example.com/exercises.pdf",
          pages: 15,
          size: 3.2
        }
      },
      {
        id: "11",
        type: "quiz",
        title: "Story Structure Quiz",
        order: 2,
        content: {
          questions: [
            {
              id: "q2",
              question: "What are the three acts of a story?",
              type: "short",
              correctAnswer: "Setup, Confrontation, Resolution",
              points: 2
            }
          ]
        }
      }
    ],
    enrollmentCount: 127,
    rating: 4.7,
    status: "published",
    createdAt: "2024-01-08T14:30:00Z",
    updatedAt: "2024-01-16T10:25:00Z"
  },
  {
    Id: 6,
    title: "React Development Bootcamp",
    description: "Build modern web applications with React. Learn components, hooks, state management, and deployment strategies.",
    price: 129.99,
    currency: "USD",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
    category: "Development",
    duration: 480,
    sections: [
      {
        id: "12",
        type: "video",
        title: "React Components",
        order: 0,
        content: {
          url: "https://example.com/react-components.mp4",
          duration: 840,
          thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=113&fit=crop"
        }
      },
      {
        id: "13",
        type: "video",
        title: "State Management",
        order: 1,
        content: {
          url: "https://example.com/state.mp4",
          duration: 720,
          thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=200&h=113&fit=crop"
        }
      },
      {
        id: "14",
        type: "pdf",
        title: "React Best Practices",
        order: 2,
        content: {
          url: "https://example.com/best-practices.pdf",
          pages: 18,
          size: 4.5
        }
      },
      {
        id: "15",
        type: "quiz",
        title: "Hooks and State Quiz",
        order: 3,
        content: {
          questions: [
            {
              id: "q3",
              question: "Which hook is used for side effects?",
              type: "multiple",
              options: ["useState", "useEffect", "useContext", "useReducer"],
              correctAnswer: 1,
              points: 1
            },
            {
              id: "q4",
              question: "React uses a virtual DOM",
              type: "truefalse",
              correctAnswer: "true",
              points: 1
            }
          ]
        }
      }
    ],
    enrollmentCount: 312,
    rating: 4.9,
    status: "published",
    createdAt: "2024-01-05T16:00:00Z",
    updatedAt: "2024-01-21T12:15:00Z"
  }
];