import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Fab,
  Drawer,
  Typography,
  TextField,
  IconButton,
  Paper,
  Avatar,
  Button,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

// Add greetings and common responses
const greetings = {
  'hello': ["Hi there! 👋 How can I help you today?", "Hello! Welcome to NEXORAZ. What can I do for you?"],
  'hi': ["Hey! 👋 How can I assist you?", "Hi! What would you like to know about NEXORAZ?"],
  'hey': ["Hello! 😊 How can I help?", "Hey there! What can I do for you today?"],
  'good morning': ["Good morning! ☀️ How can I assist you today?", "Morning! How may I help you?"],
  'good afternoon': ["Good afternoon! 🌤️ How can I help you today?", "Afternoon! What can I do for you?"],
  'good evening': ["Good evening! 🌙 How may I assist you?", "Evening! How can I help you today?"],
  'thanks': ["You're welcome! 😊 Let me know if you need anything else!", "Happy to help! 🌟 Feel free to ask more questions!"],
  'thank you': ["You're welcome! 😊 Is there anything else you'd like to know?", "Glad I could help! 🌟 Let me know if you need more assistance!"],
  'bye': ["Goodbye! 👋 Have a great day!", "Bye! Feel free to come back if you have more questions! 😊"],
  'goodbye': ["Take care! 👋 Come back anytime!", "Goodbye! Have a wonderful day! 😊"],
};

const commonPhrases = {
  'how are you': "I'm doing great, thanks for asking! 😊 How can I help you today?",
  'who are you': "I'm the NEXORAZ Assistant, here to help you with any questions about our platform! 🤖",
  'what can you do': "I can help you with:\n✨ Creating and managing graphs\n📊 Using platform features\n👥 Collaboration\n🔧 Technical support\n💡 And much more!\n\nWhat would you like to know about?",
  'help': "I'd be happy to help! Here are some common topics:\n📈 Graph creation\n🔗 Adding nodes & connections\n👥 Sharing & collaboration\n⚙️ Account settings\n\nWhat would you like to learn more about?",
  'features': "Here are NEXORAZ's main features:\n✨ Dynamic graph creation\n🤖 AI-powered insights\n👥 Real-time collaboration\n🎨 Interactive visualization\n🔍 Advanced search\n\nWould you like details about any specific feature?",
};

const predefinedAnswers = {
  'how to create a graph': 'To create a new graph:\n1. Go to Dashboard\n2. Click "Create New Graph"\n3. Enter title and description\n4. Start adding nodes and connections',
  
  'how to add nodes': 'To add nodes to your graph:\n1. Open your graph\n2. Click the "+" button\n3. Choose node type\n4. Enter node details',
  
  'how to connect nodes': 'To connect nodes:\n1. Click on the source node\n2. Hold and drag to the target node\n3. Enter the relationship type\n4. Click save',
  
  'what is nexoraz': 'NEXORAZ is a dynamic knowledge graph platform that helps you visualize and manage complex information through interactive graphs. It features AI-powered insights and real-time collaboration.',
  
  'how to share graphs': 'To share your graph:\n1. Open the graph\n2. Click the "Share" button\n3. Choose sharing permissions\n4. Copy and share the link',
  
  'pricing': 'NEXORAZ is currently free to use during our beta phase. Stay tuned for our premium features!',
  
  'forgot password': 'To reset your password:\n1. Go to Login page\n2. Click "Forgot Password"\n3. Enter your email\n4. Follow instructions sent to your email',
  
  'graph features': 'NEXORAZ graphs feature:\n- Dynamic node creation\n- Real-time collaboration\n- AI-powered insights\n- Interactive visualization\n- Custom node types\n- Relationship mapping\n- Search functionality\n- Export options',
  
  'graph types': 'You can create different types of graphs:\n- Concept Maps\n- Process Flows\n- Organization Charts\n- Knowledge Networks\n- Research Maps\n- Project Dependencies',
  
  'node types': 'Available node types include:\n- Concepts\n- Processes\n- People\n- Organizations\n- Events\n- Locations\n- Documents\nEach type has unique properties and visualization options.',
  
  'collaboration': 'To collaborate on a graph:\n1. Open the graph\n2. Click "Share"\n3. Invite team members via email\n4. Set permissions (view/edit)\n5. Team members can join and work together in real-time',
  
  'share graphs': 'To share your graph:\n1. Open the graph\n2. Click the "Share" button\n3. Choose sharing permissions\n4. Copy and share the link',
  
  'create account': 'To create an account:\n1. Click "Register" on the homepage\n2. Enter your email and password\n3. Verify your email\n4. Complete your profile',
  
  'change password': 'To change your password:\n1. Go to Profile Settings\n2. Click "Security"\n3. Enter current password\n4. Enter and confirm new password',
  
  'get help': 'Need help? You can:\n1. Check our documentation\n2. Contact support\n3. Join our community forum\n4. Watch tutorial videos\n5. Schedule a demo',
  
  'contact support': 'To contact support:\n1. Email: support@nexoraz.com\n2. Live chat: Available 24/7\n3. Phone: +1-XXX-XXX-XXXX\n4. Visit our Help Center',
  
  'pricing': 'NEXORAZ is currently free to use during our beta phase. Our upcoming plans will include:\n- Free: Basic features\n- Pro: Advanced features\n- Enterprise: Custom solutions',
  
  'search': 'To search within a graph:\n1. Use the search bar at the top\n2. Enter keywords or node names\n3. Use filters for specific types\n4. Click results to navigate',
  
  'export': 'To export your graph:\n1. Open the graph\n2. Click "Export"\n3. Choose format (PNG, PDF, JSON)\n4. Download the file',
  
  'customize': 'To customize your graph:\n1. Select nodes/edges\n2. Use the style panel\n3. Change colors, sizes, fonts\n4. Save custom themes',
  
  'ai features': 'NEXORAZ AI features:\n- Automatic node suggestions\n- Relationship analysis\n- Pattern detection\n- Knowledge extraction\n- Smart layouts\n- Content recommendations',
  
  'loading issues': 'If your graph is loading slowly:\n1. Check your internet connection\n2. Clear browser cache\n3. Reduce graph complexity\n4. Try a different browser',
  
  'save error': 'If you cannot save:\n1. Check your internet connection\n2. Ensure you have edit permissions\n3. Try saving smaller changes\n4. Contact support if persistent',
  
  // Add more conversational alternatives
  'i need help': "I'm here to help! 😊 What specific aspect of NEXORAZ would you like assistance with?\n\nYou can ask about:\n📊 Creating graphs\n🔗 Managing connections\n👥 Collaboration\n⚙️ Settings",
  
  'not working': "I'm sorry to hear that! 😟 To help you better, could you tell me:\n1. What specific feature isn't working?\n2. What were you trying to do?\n3. Any error messages you saw?",
  
  'confused': "Don't worry! 😊 Let's break it down. What specific part of NEXORAZ are you having trouble with?\n\nI can help with:\n- Basic navigation\n- Graph creation\n- Feature explanations",
  
  'stuck': "No problem! 🌟 Let's figure this out together. What were you trying to do when you got stuck?",
  
  'how do i start': "Welcome to NEXORAZ! 🚀 Here's how to get started:\n1. Create an account\n2. Explore the dashboard\n3. Create your first graph\n4. Add nodes and connections\n\nWould you like details about any of these steps?",
  
  'recommend': "I'll analyze your needs and provide personalized recommendations! 🤖\nWhat type of graph are you working on?",
  
  'analyze': "I can help analyze your graph and suggest improvements! 📊\nWhat specific aspects would you like me to look at?",
  
  'suggest': "I'd be happy to make some suggestions! 💡\nAre you looking for:\n1. Graph structure ideas\n2. Node type recommendations\n3. Visualization tips\n4. Best practices",
  
  'who created nexoraz': "NEXORAZ was created by Mr. Rohit Prajapat, a visionary in knowledge graph technology. 🚀\n\nAs founder and CEO, he leads our mission to revolutionize how people visualize and understand complex information.",
  
  'who is the founder': "Mr. Rohit Prajapat is the founder and CEO of NEXORAZ. 👨‍💼\n\nHe established NEXORAZ with the vision of transforming knowledge management through innovative graph visualization and AI integration.",
  
  'about rohit': "Mr. Rohit Prajapat is the founder and CEO of NEXORAZ. 👨‍💼\n\nHe's a technology innovator focused on:\n✨ Knowledge Graph Technology\n🤖 AI Integration\n📊 Data Visualization\n🔗 Information Management\n\nYou can connect with him on:\n📧 Email: contactnexoraz@gmail.com\n🔗 LinkedIn: /in/rohit-prajapat-878bb2255\n🐦 Twitter: @nexoraz_",
  
  'contact rohit': "You can reach Mr. Rohit Prajapat through:\n\n📧 Email: contactnexoraz@gmail.com\n🔗 LinkedIn: linkedin.com/in/rohit-prajapat-878bb2255\n🐦 Twitter: @nexoraz_\n\nHe's always interested in hearing from users and discussing potential collaborations!",
  
  'company info': "About NEXORAZ:\n\n👨‍💼 Founded by: Mr. Rohit Prajapat\n📍 Location: Vadodara, India\n🌐 Website: nexoraz.com\n📧 Contact: contactnexoraz@gmail.com\n\nOur mission is to revolutionize knowledge visualization and management through innovative graph technology and AI integration.",
  
  'where is nexoraz': "NEXORAZ is based in Vadodara, India 📍\n\nFounded by Mr. Rohit Prajapat, we're building the future of knowledge visualization from the heart of Gujarat!",
  
  'when was nexoraz founded': "NEXORAZ was founded in 2023 by Mr. Rohit Prajapat 📅\n\nSince then, we've been dedicated to revolutionizing knowledge visualization and management.",
};

const Message = ({ text, isBot, timestamp, isHelp }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'flex-start',
      mb: 2,
      flexDirection: isBot ? 'row' : 'row-reverse',
    }}
  >
    <Avatar
      sx={{
        bgcolor: isBot ? '#64ffda' : '#233554',
        width: 32,
        height: 32,
        mr: isBot ? 1 : 0,
        ml: isBot ? 0 : 1,
      }}
    >
      {isBot ? 'N' : 'U'}
    </Avatar>
    <Paper
      sx={{
        p: 2,
        maxWidth: '70%',
        bgcolor: isBot ? '#112240' : '#1a365d',
        borderRadius: 2,
      }}
    >
      <Typography color="#ccd6f6" sx={{ whiteSpace: 'pre-line' }}>
        {text}
      </Typography>
      {isHelp && (
        <Button
          variant="contained"
          size="small"
          startIcon={<HelpIcon />}
          onClick={() => window.location.href = '/contact'}
          sx={{
            mt: 2,
            bgcolor: '#64ffda',
            color: '#0a192f',
            '&:hover': { bgcolor: '#4caf50' },
          }}
        >
          Contact Support
        </Button>
      )}
      <Typography variant="caption" color="#8892b0" display="block" mt={1}>
        {new Date(timestamp).toLocaleTimeString()}
      </Typography>
    </Paper>
  </Box>
);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "👋 Hi! I'm your NEXORAZ Assistant!\n\nI can help you with:\n✨ Creating graphs\n🔗 Adding nodes\n👥 Collaboration\n❓ General questions\n\nJust type your question, and I'll be happy to help! 😊",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const currentGraph = useSelector(state => state.graph.currentGraph);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRandomResponse = (responses) => {
    if (Array.isArray(responses)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
    return responses;
  };

  const findBestMatch = (input) => {
    const userQuestion = input.toLowerCase();

    // Check for greetings first
    for (const [key, value] of Object.entries(greetings)) {
      if (userQuestion.includes(key)) {
        return getRandomResponse(value);
      }
    }

    // Check for common phrases
    for (const [key, value] of Object.entries(commonPhrases)) {
      if (userQuestion.includes(key)) {
        return value;
      }
    }

    // Check predefined answers
    for (const [key, value] of Object.entries(predefinedAnswers)) {
      if (userQuestion.includes(key)) {
        return value;
      }
    }

    // If no match found, provide a friendly fallback
    return "I'm not quite sure about that. 🤔 But I'd love to help! Could you:\n1. Rephrase your question?\n2. Use simpler terms?\n3. Or click the 'Contact Support' button below for personalized help!";
  };

  const getAIRecommendations = async (query) => {
    try {
      setIsAnalyzing(true);
      const response = await axios.post('/api/chat/recommend', {
        query,
        context: {
          activity: 'creating_graph',
          graphType: currentGraph?.type || 'general',
          domain: currentGraph?.domain || 'general',
          experience: 'beginner'
        }
      });

      const recommendations = response.data;
      return recommendations.general;
    } catch (error) {
      console.error('AI recommendation error:', error);
      return "I encountered an error while generating recommendations. Please try again.";
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeCurrentGraph = async () => {
    if (!currentGraph) return null;
    
    try {
      setIsAnalyzing(true);
      const response = await axios.post('/api/chat/analyze', {
        graph: currentGraph
      });
      
      return response.data.analysis;
    } catch (error) {
      console.error('Graph analysis error:', error);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Check if user is requesting AI features
    const userInput = input.toLowerCase();
    if (userInput.includes('recommend') || userInput.includes('suggest')) {
      const aiRecommendations = await getAIRecommendations(input);
      const botMessage = {
        text: aiRecommendations,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      return;
    }

    if (userInput.includes('analyze') && currentGraph) {
      const analysis = await analyzeCurrentGraph();
      const botMessage = {
        text: analysis || "I couldn't analyze the graph at this moment. Please try again.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      return;
    }

    // Regular chatbot response
    const answer = findBestMatch(userInput);
    const botMessage = {
      text: answer,
      isBot: true,
      timestamp: new Date(),
      isHelp: !answer,
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  return (
    <>
      <Fab
        component={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        color="primary"
        onClick={() => setIsOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          bgcolor: '#64ffda',
          color: '#0a192f',
          '&:hover': { bgcolor: '#4caf50' },
        }}
      >
        <ChatIcon />
      </Fab>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            bgcolor: '#0a192f',
            borderLeft: '1px solid #233554',
          },
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              p: 2,
              borderBottom: '1px solid #233554',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" color="#64ffda">
              NEXORAZ Assistant
            </Typography>
            <IconButton onClick={() => setIsOpen(false)} sx={{ color: '#64ffda' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Message {...message} />
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </Box>

          <Box
            sx={{
              p: 2,
              borderTop: '1px solid #233554',
              display: 'flex',
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#ccd6f6',
                  '& fieldset': { borderColor: '#233554' },
                  '&:hover fieldset': { borderColor: '#64ffda' },
                  '&.Mui-focused fieldset': { borderColor: '#64ffda' },
                },
              }}
            />
            <IconButton
              onClick={handleSend}
              disabled={!input.trim()}
              sx={{
                color: '#64ffda',
                '&.Mui-disabled': { color: '#233554' },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatBot; 