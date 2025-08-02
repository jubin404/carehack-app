import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  Video, 
  Download, 
  ExternalLink, 
  Search,
  Filter,
  Heart,
  Share2,
  Clock,
  Users
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const mockArticles = [
  {
    id: 1,
    title: 'Understanding Child Development Milestones',
    description: 'A comprehensive guide to key developmental milestones from birth to adolescence.',
    category: 'Development',
    readTime: '8 min read',
    author: 'Dr. Sarah Johnson',
    date: '2025-07-15',
    image: 'child development',
    tags: ['Development', 'Milestones', 'Growth'],
    likes: 156,
    type: 'article'
  },
  {
    id: 2,
    title: 'Nutrition Essentials for Growing Children',
    description: 'Learn about proper nutrition and healthy eating habits for children of all ages.',
    category: 'Nutrition',
    readTime: '6 min read',
    author: 'Dr. Michael Chen',
    date: '2025-07-12',
    image: 'healthy food children',
    tags: ['Nutrition', 'Health', 'Diet'],
    likes: 203,
    type: 'article'
  },
  {
    id: 3,
    title: 'Managing Childhood Allergies',
    description: 'Essential information for parents dealing with childhood allergies and food sensitivities.',
    category: 'Health',
    readTime: '10 min read',
    author: 'Dr. Emily Davis',
    date: '2025-07-10',
    image: 'child allergy',
    tags: ['Allergies', 'Safety', 'Health'],
    likes: 89,
    type: 'article'
  }
];

const mockVideos = [
  {
    id: 4,
    title: 'Early Signs of Speech Delays',
    description: 'Recognizing when to seek professional help for speech and language development.',
    category: 'Development',
    duration: '12:34',
    author: 'Speech Therapy Center',
    date: '2025-07-08',
    image: 'speech therapy children',
    tags: ['Speech', 'Development', 'Therapy'],
    views: 1243,
    type: 'video'
  },
  {
    id: 5,
    title: 'Vaccination Schedule Explained',
    description: 'Understanding the importance and timing of childhood vaccinations.',
    category: 'Health',
    duration: '15:20',
    author: 'Pediatric Health Association',
    date: '2025-07-05',
    image: 'child vaccination',
    tags: ['Vaccination', 'Prevention', 'Health'],
    views: 2156,
    type: 'video'
  },
  {
    id: 6,
    title: 'Promoting Physical Activity in Children',
    description: 'Fun ways to encourage physical fitness and healthy habits in children.',
    category: 'Fitness',
    duration: '9:45',
    author: 'Children\'s Fitness Institute',
    date: '2025-07-02',
    image: 'children exercise',
    tags: ['Fitness', 'Activity', 'Health'],
    views: 890,
    type: 'video'
  }
];

const mockTools = [
  {
    id: 7,
    title: 'Growth Chart Calculator',
    description: 'Track your child\'s growth percentiles with our interactive calculator.',
    category: 'Tools',
    type: 'tool',
    icon: '📊',
    link: '#'
  },
  {
    id: 8,
    title: 'Immunization Tracker',
    description: 'Keep track of your child\'s vaccination schedule and upcoming shots.',
    category: 'Tools',
    type: 'tool',
    icon: '💉',
    link: '#'
  },
  {
    id: 9,
    title: 'Developmental Milestone Checklist',
    description: 'Age-specific checklists to track your child\'s developmental progress.',
    category: 'Tools',
    type: 'tool',
    icon: '✅',
    link: '#'
  }
];

const allResources = [...mockArticles, ...mockVideos, ...mockTools];

export function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = ['all', 'Development', 'Health', 'Nutrition', 'Fitness', 'Tools'];
  const types = ['all', 'article', 'video', 'tool'];

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getResourceIcon = (type) => {
    switch (type) {
      case 'article':
        return <BookOpen className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'tool':
        return <Filter className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Development':
        return 'bg-blue-100 text-blue-800';
      case 'Health':
        return 'bg-green-100 text-green-800';
      case 'Nutrition':
        return 'bg-orange-100 text-orange-800';
      case 'Fitness':
        return 'bg-purple-100 text-purple-800';
      case 'Tools':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1>Educational Resources</h1>
        <Button>
          <Share2 className="w-4 h-4 mr-2" />
          Share Resources
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {types.map(type => (
              <SelectItem key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  {resource.type !== 'tool' && resource.image && (
                    <ImageWithFallback
                      src={`https://images.unsplash.com/400x200/?${encodeURIComponent(resource.image)}`}
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  {resource.type === 'tool' && (
                    <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <span className="text-6xl">{resource.icon}</span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <Badge className={getCategoryColor(resource.category)}>
                      {resource.category}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    {getResourceIcon(resource.type)}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resource.author && (
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>By {resource.author}</span>
                      <span>{resource.date}</span>
                    </div>
                  )}
                  
                  {resource.readTime && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{resource.readTime}</span>
                    </div>
                  )}
                  
                  {resource.duration && (
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{resource.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{resource.views?.toLocaleString()} views</span>
                      </div>
                    </div>
                  )}
                  
                  {resource.tags && (
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-4">
                      {resource.likes && (
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Heart className="w-4 h-4" />
                          <span>{resource.likes}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {resource.type === 'article' && (
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <ImageWithFallback
                  src={`https://images.unsplash.com/400x200/?${encodeURIComponent(article.image)}`}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{article.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      <span>{article.likes}</span>
                    </div>
                    <Button size="sm">Read Article</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/400x200/?${encodeURIComponent(video.image)}`}
                    alt={video.title}  
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Video className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-primary/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(video.category)}>
                      {video.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{video.views?.toLocaleString()}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{video.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{video.description}</p>
                </CardHeader>
                <CardContent>
                  <Button size="sm" className="w-full">
                    <Video className="w-4 h-4 mr-2" />
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{tool.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                      <Badge className={getCategoryColor(tool.category)}>
                        {tool.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Use Tool
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}