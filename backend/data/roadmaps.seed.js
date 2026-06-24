const roadmapsSeedData = [
    {
        title: "Frontend Developer",
        category: "Web Development",
        description: "Master HTML, CSS, JavaScript, and modern frontend frameworks to build responsive user interfaces.",
        difficulty: "beginner",
        estimatedDuration: "4-6 months",
        steps: [
            {
                title: "HTML Fundamentals",
                description: "Learn semantic HTML, forms, accessibility basics, and document structure.",
                resources: [
                    { title: "MDN HTML Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", type: "docs" },
                    { title: "freeCodeCamp Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", type: "course" }
                ],
                order: 1
            },
            {
                title: "CSS & Layout",
                description: "Understand Flexbox, Grid, responsive design, and CSS fundamentals.",
                resources: [
                    { title: "CSS Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", type: "article" },
                    { title: "MDN CSS Grid", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout", type: "docs" }
                ],
                order: 2
            },
            {
                title: "JavaScript Basics",
                description: "Variables, functions, DOM manipulation, events, and ES6 syntax.",
                resources: [
                    { title: "JavaScript.info", url: "https://javascript.info/", type: "course" },
                    { title: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", type: "docs" }
                ],
                order: 3
            },
            {
                title: "React Fundamentals",
                description: "Components, props, state, hooks, and component lifecycle patterns.",
                resources: [
                    { title: "React Official Docs", url: "https://react.dev/learn", type: "docs" },
                    { title: "React Tutorial", url: "https://react.dev/learn/tutorial-tic-tac-toe", type: "course" }
                ],
                order: 4
            },
            {
                title: "State Management",
                description: "Learn Context API, Redux Toolkit, and when to use each approach.",
                resources: [
                    { title: "Redux Toolkit Docs", url: "https://redux-toolkit.js.org/", type: "docs" }
                ],
                order: 5
            },
            {
                title: "API Integration",
                description: "Fetch data with axios/fetch, handle loading states, and error boundaries.",
                resources: [
                    { title: "MDN Fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API", type: "docs" }
                ],
                order: 6
            },
            {
                title: "Testing & Tooling",
                description: "Use Vite, ESLint, and basic component testing workflows.",
                resources: [
                    { title: "Vite Guide", url: "https://vitejs.dev/guide/", type: "docs" }
                ],
                order: 7
            },
            {
                title: "Portfolio Project",
                description: "Build and deploy a production-ready frontend portfolio application.",
                resources: [
                    { title: "Frontend Mentor", url: "https://www.frontendmentor.io/", type: "course" }
                ],
                order: 8
            }
        ]
    },
    {
        title: "Backend Developer",
        category: "Web Development",
        description: "Learn server-side programming, REST APIs, databases, and backend architecture.",
        difficulty: "intermediate",
        estimatedDuration: "5-7 months",
        steps: [
            {
                title: "Programming Fundamentals",
                description: "Core programming concepts with JavaScript or Python.",
                resources: [
                    { title: "freeCodeCamp JS Algorithms", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", type: "course" }
                ],
                order: 1
            },
            {
                title: "Node.js Basics",
                description: "Modules, npm, event loop, and asynchronous programming.",
                resources: [
                    { title: "Node.js Docs", url: "https://nodejs.org/en/docs", type: "docs" }
                ],
                order: 2
            },
            {
                title: "Express.js",
                description: "Routing, middleware, error handling, and REST conventions.",
                resources: [
                    { title: "Express Guide", url: "https://expressjs.com/en/guide/routing.html", type: "docs" }
                ],
                order: 3
            },
            {
                title: "Databases & SQL",
                description: "Relational modeling, queries, joins, and indexing basics.",
                resources: [
                    { title: "SQLBolt", url: "https://sqlbolt.com/", type: "course" }
                ],
                order: 4
            },
            {
                title: "MongoDB & Mongoose",
                description: "NoSQL modeling, schemas, aggregation, and Mongoose ODM.",
                resources: [
                    { title: "MongoDB University", url: "https://learn.mongodb.com/", type: "course" }
                ],
                order: 5
            },
            {
                title: "Authentication & Security",
                description: "JWT, bcrypt, cookies, CORS, and input validation.",
                resources: [
                    { title: "OWASP Top Ten", url: "https://owasp.org/www-project-top-ten/", type: "article" }
                ],
                order: 6
            },
            {
                title: "API Design",
                description: "Design scalable REST APIs with pagination, filtering, and versioning.",
                resources: [
                    { title: "REST API Tutorial", url: "https://restfulapi.net/", type: "article" }
                ],
                order: 7
            },
            {
                title: "Deployment",
                description: "Deploy backend services with environment configs and logging.",
                resources: [
                    { title: "Render Docs", url: "https://render.com/docs", type: "docs" }
                ],
                order: 8
            }
        ]
    },
    {
        title: "MERN Stack Developer",
        category: "Web Development",
        description: "Full MERN workflow from React frontend to Express API and MongoDB persistence.",
        difficulty: "intermediate",
        estimatedDuration: "6-8 months",
        steps: [
            {
                title: "HTML, CSS & JavaScript",
                description: "Frontend foundations required before MERN integration.",
                resources: [
                    { title: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn", type: "docs" }
                ],
                order: 1
            },
            {
                title: "React with Vite",
                description: "Build SPA frontend with React Router and component architecture.",
                resources: [
                    { title: "React Docs", url: "https://react.dev/", type: "docs" }
                ],
                order: 2
            },
            {
                title: "Redux Toolkit",
                description: "Manage global app state for auth, posts, and real-time features.",
                resources: [
                    { title: "Redux Toolkit", url: "https://redux-toolkit.js.org/tutorials/overview", type: "course" }
                ],
                order: 3
            },
            {
                title: "Node & Express API",
                description: "Create REST endpoints, middleware, and file upload flows.",
                resources: [
                    { title: "Express.js", url: "https://expressjs.com/", type: "docs" }
                ],
                order: 4
            },
            {
                title: "MongoDB with Mongoose",
                description: "Model users, posts, and relationships in MongoDB.",
                resources: [
                    { title: "Mongoose Docs", url: "https://mongoosejs.com/docs/guide.html", type: "docs" }
                ],
                order: 5
            },
            {
                title: "Authentication Flow",
                description: "Implement signup, signin, JWT cookies, and protected routes.",
                resources: [
                    { title: "JWT Introduction", url: "https://jwt.io/introduction", type: "article" }
                ],
                order: 6
            },
            {
                title: "Real-time with Socket.IO",
                description: "Add chat, notifications, and live updates to MERN apps.",
                resources: [
                    { title: "Socket.IO Docs", url: "https://socket.io/docs/v4/", type: "docs" }
                ],
                order: 7
            },
            {
                title: "MERN Capstone",
                description: "Ship a social or productivity MERN application end-to-end.",
                resources: [
                    { title: "Cloudinary Docs", url: "https://cloudinary.com/documentation", type: "docs" }
                ],
                order: 8
            }
        ]
    },
    {
        title: "Full Stack Developer",
        category: "Web Development",
        description: "End-to-end web development covering frontend, backend, databases, and DevOps basics.",
        difficulty: "advanced",
        estimatedDuration: "8-12 months",
        steps: [
            {
                title: "Frontend Core",
                description: "HTML, CSS, JavaScript, and a modern framework.",
                resources: [
                    { title: "The Odin Project", url: "https://www.theodinproject.com/", type: "course" }
                ],
                order: 1
            },
            {
                title: "Backend Core",
                description: "Server frameworks, APIs, and business logic layers.",
                resources: [
                    { title: "Node.js Best Practices", url: "https://github.com/goldbergyoni/nodebestpractices", type: "article" }
                ],
                order: 2
            },
            {
                title: "Database Design",
                description: "SQL and NoSQL tradeoffs, normalization, and schema design.",
                resources: [
                    { title: "Database Design Course", url: "https://www.coursera.org/learn/database-design", type: "course" }
                ],
                order: 3
            },
            {
                title: "System Design Basics",
                description: "Caching, load balancing, and scalable architecture patterns.",
                resources: [
                    { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", type: "article" }
                ],
                order: 4
            },
            {
                title: "CI/CD Fundamentals",
                description: "Automated testing pipelines and deployment workflows.",
                resources: [
                    { title: "GitHub Actions Docs", url: "https://docs.github.com/en/actions", type: "docs" }
                ],
                order: 5
            },
            {
                title: "Cloud Deployment",
                description: "Deploy full stack apps on cloud platforms with env management.",
                resources: [
                    { title: "AWS Free Tier", url: "https://aws.amazon.com/free/", type: "docs" }
                ],
                order: 6
            },
            {
                title: "Performance Optimization",
                description: "Optimize frontend bundles, API latency, and database queries.",
                resources: [
                    { title: "Web.dev Performance", url: "https://web.dev/performance/", type: "article" }
                ],
                order: 7
            },
            {
                title: "Production Project",
                description: "Launch a monitored, tested, and documented full stack product.",
                resources: [
                    { title: "Full Stack Open", url: "https://fullstackopen.com/en/", type: "course" }
                ],
                order: 8
            }
        ]
    },
    {
        title: "Data Analyst",
        category: "Data Science",
        description: "Analyze data using SQL, Excel, Python, and visualization tools.",
        difficulty: "beginner",
        estimatedDuration: "4-6 months",
        steps: [
            {
                title: "Excel & Spreadsheets",
                description: "Formulas, pivot tables, and data cleaning in spreadsheets.",
                resources: [
                    { title: "Google Sheets Training", url: "https://support.google.com/a/users/answer/9282956", type: "course" }
                ],
                order: 1
            },
            {
                title: "SQL for Analysis",
                description: "Query, filter, aggregate, and join relational datasets.",
                resources: [
                    { title: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/", type: "course" }
                ],
                order: 2
            },
            {
                title: "Python for Data",
                description: "Use pandas and numpy for data manipulation and exploration.",
                resources: [
                    { title: "Kaggle Python Course", url: "https://www.kaggle.com/learn/python", type: "course" }
                ],
                order: 3
            },
            {
                title: "Data Visualization",
                description: "Create charts with Matplotlib, Seaborn, or Tableau.",
                resources: [
                    { title: "Seaborn Tutorial", url: "https://seaborn.pydata.org/tutorial.html", type: "docs" }
                ],
                order: 4
            },
            {
                title: "Statistics Basics",
                description: "Descriptive stats, distributions, and hypothesis testing.",
                resources: [
                    { title: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability", type: "course" }
                ],
                order: 5
            },
            {
                title: "Business Analytics",
                description: "Translate data insights into actionable business recommendations.",
                resources: [
                    { title: "Google Data Analytics Certificate", url: "https://www.coursera.org/professional-certificates/google-data-analytics", type: "course" }
                ],
                order: 6
            },
            {
                title: "Dashboard Building",
                description: "Build interactive dashboards for stakeholders.",
                resources: [
                    { title: "Tableau Learning", url: "https://www.tableau.com/learn/training", type: "course" }
                ],
                order: 7
            },
            {
                title: "Analyst Portfolio",
                description: "Publish case studies with datasets, analysis, and visualizations.",
                resources: [
                    { title: "Kaggle Datasets", url: "https://www.kaggle.com/datasets", type: "docs" }
                ],
                order: 8
            }
        ]
    },
    {
        title: "Data Scientist",
        category: "Data Science",
        description: "Statistical modeling, machine learning, and data-driven decision making.",
        difficulty: "intermediate",
        estimatedDuration: "8-12 months",
        steps: [
            {
                title: "Python & Math Foundations",
                description: "Linear algebra, calculus basics, and Python programming.",
                resources: [
                    { title: "3Blue1Brown Linear Algebra", url: "https://www.3blue1brown.com/topics/linear-algebra", type: "video" }
                ],
                order: 1
            },
            {
                title: "Statistics & Probability",
                description: "Probability, inference, and experimental design.",
                resources: [
                    { title: "StatQuest", url: "https://statquest.org/", type: "video" }
                ],
                order: 2
            },
            {
                title: "Data Wrangling",
                description: "Clean, transform, and prepare messy real-world datasets.",
                resources: [
                    { title: "Pandas Documentation", url: "https://pandas.pydata.org/docs/", type: "docs" }
                ],
                order: 3
            },
            {
                title: "Exploratory Data Analysis",
                description: "Discover patterns, outliers, and correlations in data.",
                resources: [
                    { title: "Kaggle EDA Course", url: "https://www.kaggle.com/learn/data-cleaning", type: "course" }
                ],
                order: 4
            },
            {
                title: "Machine Learning Basics",
                description: "Supervised and unsupervised learning with scikit-learn.",
                resources: [
                    { title: "scikit-learn User Guide", url: "https://scikit-learn.org/stable/user_guide.html", type: "docs" }
                ],
                order: 5
            },
            {
                title: "Model Evaluation",
                description: "Cross-validation, metrics, bias-variance tradeoff.",
                resources: [
                    { title: "ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course", type: "course" }
                ],
                order: 6
            },
            {
                title: "Feature Engineering",
                description: "Create meaningful features to improve model performance.",
                resources: [
                    { title: "Feature Engineering Book", url: "https://www.fe4ml.org/", type: "book" }
                ],
                order: 7
            },
            {
                title: "Data Science Project",
                description: "End-to-end project from problem framing to model deployment.",
                resources: [
                    { title: "Kaggle Competitions", url: "https://www.kaggle.com/competitions", type: "course" }
                ],
                order: 8
            }
        ]
    },
    {
        title: "Machine Learning Engineer",
        category: "Data Science",
        description: "Production ML systems, model training pipelines, and MLOps fundamentals.",
        difficulty: "advanced",
        estimatedDuration: "10-14 months",
        steps: [
            {
                title: "ML Foundations",
                description: "Core algorithms, loss functions, and optimization.",
                resources: [
                    { title: "Andrew Ng ML Course", url: "https://www.coursera.org/learn/machine-learning", type: "course" }
                ],
                order: 1
            },
            {
                title: "Deep Learning Basics",
                description: "Neural networks, backpropagation, and frameworks.",
                resources: [
                    { title: "Deep Learning Book", url: "https://www.deeplearningbook.org/", type: "book" }
                ],
                order: 2
            },
            {
                title: "PyTorch or TensorFlow",
                description: "Build and train models with a deep learning framework.",
                resources: [
                    { title: "PyTorch Tutorials", url: "https://pytorch.org/tutorials/", type: "docs" }
                ],
                order: 3
            },
            {
                title: "ML Pipelines",
                description: "Data pipelines, training workflows, and experiment tracking.",
                resources: [
                    { title: "MLflow Docs", url: "https://mlflow.org/docs/latest/index.html", type: "docs" }
                ],
                order: 4
            },
            {
                title: "Model Serving",
                description: "Deploy models via REST APIs and batch inference.",
                resources: [
                    { title: "FastAPI Docs", url: "https://fastapi.tiangolo.com/", type: "docs" }
                ],
                order: 5
            },
            {
                title: "MLOps",
                description: "Monitoring, retraining, and version control for ML systems.",
                resources: [
                    { title: "Made With ML MLOps", url: "https://madewithml.com/", type: "course" }
                ],
                order: 6
            },
            {
                title: "Cloud ML Services",
                description: "Use managed ML platforms for scalable training and inference.",
                resources: [
                    { title: "AWS SageMaker", url: "https://docs.aws.amazon.com/sagemaker/", type: "docs" }
                ],
                order: 7
            },
            {
                title: "Production ML Project",
                description: "Ship a monitored ML service with CI/CD and observability.",
                resources: [
                    { title: "Full Stack Deep Learning", url: "https://fullstackdeeplearning.com/", type: "course" }
                ],
                order: 8
            }
        ]
    },
    {
        title: "AI Engineer",
        category: "Artificial Intelligence",
        description: "Build AI applications with LLMs, embeddings, RAG, and agent workflows.",
        difficulty: "advanced",
        estimatedDuration: "8-12 months",
        steps: [
            {
                title: "Python & API Development",
                description: "Strong Python skills and REST API development.",
                resources: [
                    { title: "Real Python", url: "https://realpython.com/", type: "course" }
                ],
                order: 1
            },
            {
                title: "NLP Fundamentals",
                description: "Tokenization, embeddings, transformers, and attention.",
                resources: [
                    { title: "Hugging Face Course", url: "https://huggingface.co/learn/nlp-course/chapter1/1", type: "course" }
                ],
                order: 2
            },
            {
                title: "LLM APIs",
                description: "Integrate OpenAI and open-source LLM APIs into applications.",
                resources: [
                    { title: "OpenAI API Docs", url: "https://platform.openai.com/docs", type: "docs" }
                ],
                order: 3
            },
            {
                title: "Prompt Engineering",
                description: "Design reliable prompts, few-shot examples, and system instructions.",
                resources: [
                    { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", type: "article" }
                ],
                order: 4
            },
            {
                title: "RAG Systems",
                description: "Retrieval augmented generation with vector databases.",
                resources: [
                    { title: "LangChain Docs", url: "https://python.langchain.com/docs/introduction/", type: "docs" }
                ],
                order: 5
            },
            {
                title: "Vector Databases",
                description: "Store and query embeddings with Pinecone, Chroma, or FAISS.",
                resources: [
                    { title: "Pinecone Learning Center", url: "https://www.pinecone.io/learn/", type: "course" }
                ],
                order: 6
            },
            {
                title: "AI Agents",
                description: "Tool use, planning, and multi-step agent orchestration.",
                resources: [
                    { title: "LangGraph Docs", url: "https://langchain-ai.github.io/langgraph/", type: "docs" }
                ],
                order: 7
            },
            {
                title: "AI Application Project",
                description: "Build and deploy a production AI product with guardrails.",
                resources: [
                    { title: "DeepLearning.AI Short Courses", url: "https://www.deeplearning.ai/short-courses/", type: "course" }
                ],
                order: 8
            }
        ]
    },
    {
        title: "DevOps Engineer",
        category: "DevOps",
        description: "Automate infrastructure, CI/CD, monitoring, and cloud-native deployments.",
        difficulty: "intermediate",
        estimatedDuration: "6-10 months",
        steps: [
            {
                title: "Linux & Shell Scripting",
                description: "Command line proficiency, bash scripting, and file permissions.",
                resources: [
                    { title: "Linux Journey", url: "https://linuxjourney.com/", type: "course" }
                ],
                order: 1
            },
            {
                title: "Git & Version Control",
                description: "Branching strategies, pull requests, and collaborative workflows.",
                resources: [
                    { title: "Pro Git Book", url: "https://git-scm.com/book/en/v2", type: "book" }
                ],
                order: 2
            },
            {
                title: "Docker",
                description: "Containerize applications with Dockerfiles and compose.",
                resources: [
                    { title: "Docker Docs", url: "https://docs.docker.com/get-started/", type: "docs" }
                ],
                order: 3
            },
            {
                title: "Kubernetes Basics",
                description: "Pods, services, deployments, and cluster management.",
                resources: [
                    { title: "Kubernetes Docs", url: "https://kubernetes.io/docs/home/", type: "docs" }
                ],
                order: 4
            },
            {
                title: "CI/CD Pipelines",
                description: "Automate build, test, and deploy with GitHub Actions or Jenkins.",
                resources: [
                    { title: "GitHub Actions", url: "https://docs.github.com/en/actions/learn-github-actions", type: "docs" }
                ],
                order: 5
            },
            {
                title: "Infrastructure as Code",
                description: "Manage cloud resources with Terraform or CloudFormation.",
                resources: [
                    { title: "Terraform Docs", url: "https://developer.hashicorp.com/terraform/docs", type: "docs" }
                ],
                order: 6
            },
            {
                title: "Monitoring & Logging",
                description: "Observability with Prometheus, Grafana, and centralized logs.",
                resources: [
                    { title: "Prometheus Docs", url: "https://prometheus.io/docs/introduction/overview/", type: "docs" }
                ],
                order: 7
            },
            {
                title: "DevOps Capstone",
                description: "Design a resilient deployment pipeline for a web application.",
                resources: [
                    { title: "AWS DevOps Learning Plan", url: "https://aws.amazon.com/training/learn-about/devops/", type: "course" }
                ],
                order: 8
            }
        ]
    },
    {
        title: "DSA Preparation",
        category: "Interview Prep",
        description: "Master data structures and algorithms for technical interviews.",
        difficulty: "intermediate",
        estimatedDuration: "3-6 months",
        steps: [
            {
                title: "Complexity Analysis",
                description: "Big O notation, time and space complexity fundamentals.",
                resources: [
                    { title: "Big-O Cheat Sheet", url: "https://www.bigocheatsheet.com/", type: "article" }
                ],
                order: 1
            },
            {
                title: "Arrays & Strings",
                description: "Two pointers, sliding window, and string manipulation patterns.",
                resources: [
                    { title: "LeetCode Explore", url: "https://leetcode.com/explore/", type: "course" }
                ],
                order: 2
            },
            {
                title: "Linked Lists & Stacks",
                description: "Pointer manipulation, stack/queue applications.",
                resources: [
                    { title: "NeetCode Roadmap", url: "https://neetcode.io/roadmap", type: "course" }
                ],
                order: 3
            },
            {
                title: "Trees & Graphs",
                description: "BFS, DFS, binary trees, and graph traversal algorithms.",
                resources: [
                    { title: "Visualgo", url: "https://visualgo.net/en", type: "video" }
                ],
                order: 4
            },
            {
                title: "Sorting & Searching",
                description: "Classic sorting algorithms and binary search variants.",
                resources: [
                    { title: "Sorting Algorithms", url: "https://www.geeksforgeeks.org/sorting-algorithms/", type: "article" }
                ],
                order: 5
            },
            {
                title: "Dynamic Programming",
                description: "Memoization, tabulation, and common DP patterns.",
                resources: [
                    { title: "DP Patterns", url: "https://leetcode.com/discuss/general-discussion/662866/DP-for-Beginners-Problems-or-Patterns-or-Sample-Solutions", type: "article" }
                ],
                order: 6
            },
            {
                title: "Greedy Algorithms",
                description: "Greedy choice property and interval scheduling problems.",
                resources: [
                    { title: "Grokking Algorithms", url: "https://www.manning.com/books/grokking-algorithms", type: "book" }
                ],
                order: 7
            },
            {
                title: "Mock Interviews",
                description: "Practice timed problems and explain solutions clearly.",
                resources: [
                    { title: "Pramp", url: "https://www.pramp.com/", type: "course" }
                ],
                order: 8
            }
        ]
    }
];

export default roadmapsSeedData;
