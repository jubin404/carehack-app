import React from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  BookOpen,
  Settings,
  Shield,
  UserCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const navItems = [
  // {
  //   id: 'dashboard',
  //   label: 'Dashboard',
  //   icon: Home,
  //   roles: ['parent', 'admin', 'school']
  // },
    {
    id: 'reports',
    label: 'Reports',
    icon: FileText,
    roles: ['parent', 'admin', 'school']
  },
  {
    id: 'children',
    label: 'Children',
    icon: Users,
    roles: ['parent', 'admin', 'school']
  },
  {
    id: 'admin-reports',
    label: 'Admin Reports',
    icon: Shield,
    roles: ['admin', 'school']
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: BookOpen,
    roles: ['parent', 'admin', 'school']
  }
];

export function Sidebar({ 
  activeView, 
  onViewChange, 
  userRole, 
  selectedChildId,
  isTestTaking,
  onBackFromTest 
}) {
  // Don't show sidebar during test taking
  if (isTestTaking) {
    return null;
  }

  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'parent':
        return 'Parent Account';
      case 'admin':
        return 'Administrator';
      case 'school':
        return 'School Account';
      default:
        return 'User Account';
    }
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'school':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary rounded-lg">
            <Users className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">PediHealth</h1>
            <p className="text-xs text-sidebar-foreground/60">Health Tracker</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id || 
            (item.id === 'children' && (activeView === 'add-child' || activeView === 'child-detail'));
          
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                isActive 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="w-4 h-4 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-sidebar-accent rounded-lg">
            <UserCircle className="w-5 h-5 text-sidebar-accent-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              John Doe
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              john.doe@email.com
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant={getRoleBadgeVariant(userRole)} className="text-xs">
            {getRoleDisplayName(userRole)}
          </Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}