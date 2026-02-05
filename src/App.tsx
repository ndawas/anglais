import { useState } from 'react';
import { Upload, FileText, BookOpen, Clock, Users, X, Download, Eye } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  type: 'PDF' | 'Notes' | 'Exam';
  updated: string;
  users: number;
}

interface Course {
  id: number;
  name: string;
  code: string;
  color: string;
  resources: Resource[];
}

const courses: Course[] = [
  {
    id: 1,
    name: 'Cloud Computing',
    code: 'CS401',
    color: 'emerald',
    resources: [
      { id: 1, title: 'Introduction to AWS Services', type: 'PDF', updated: '2 days ago', users: 124 },
      { id: 2, title: 'Azure Fundamentals Lecture Notes', type: 'Notes', updated: '5 days ago', users: 98 },
      { id: 3, title: 'Midterm Exam 2024', type: 'Exam', updated: '1 week ago', users: 156 },
    ],
  },
  {
    id: 2,
    name: 'Cybersecurity',
    code: 'CS302',
    color: 'red',
    resources: [
      { id: 4, title: 'Network Security Principles', type: 'PDF', updated: '3 days ago', users: 142 },
      { id: 5, title: 'Cryptography Study Guide', type: 'Notes', updated: '1 week ago', users: 87 },
      { id: 6, title: 'Final Exam 2023', type: 'Exam', updated: '2 weeks ago', users: 203 },
    ],
  },
  {
    id: 3,
    name: 'Programming',
    code: 'CS101',
    color: 'amber',
    resources: [
      { id: 7, title: 'Python Basics Slides', type: 'PDF', updated: '1 day ago', users: 189 },
      { id: 8, title: 'Object-Oriented Programming Notes', type: 'Notes', updated: '4 days ago', users: 167 },
      { id: 9, title: 'Practice Exam Questions', type: 'Exam', updated: '6 days ago', users: 145 },
    ],
  },
  {
    id: 4,
    name: 'Networking',
    code: 'CS201',
    color: 'emerald',
    resources: [
      { id: 10, title: 'TCP/IP Protocol Suite', type: 'PDF', updated: '2 days ago', users: 131 },
      { id: 11, title: 'Routing and Switching Notes', type: 'Notes', updated: '1 week ago', users: 109 },
      { id: 12, title: 'CCNA Practice Exam', type: 'Exam', updated: '3 days ago', users: 178 },
    ],
  },
];

function App() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    title: '',
    course: 'CS401',
    type: 'PDF',
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-5 h-5" />;
      case 'Notes':
        return <BookOpen className="w-5 h-5" />;
      case 'Exam':
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      amber: 'bg-amber-50 text-amber-700 border-amber-200',
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowUploadModal(false);
    setUploadFormData({ title: '', course: 'CS401', type: 'PDF' });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-amber-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Resources Hub</h1>
                <p className="text-sm text-gray-600">École Supérieure d'Informatique</p>
              </div>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Upload className="w-5 h-5" />
              <span className="font-medium">Upload Resource</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Course Resources</h2>
          <p className="text-gray-600">Access lecture notes, slides, and past exams shared by students and faculty</p>
        </div>

        <div className="space-y-12">
          {courses.map((course) => (
            <div key={course.id} className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className={`px-4 py-2 rounded-lg border ${getColorClasses(course.color)} font-semibold text-sm`}>
                  {course.code}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{course.name}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {course.resources.map((resource) => (
                  <div
                    key={resource.id}
                    onClick={() => setSelectedResource(resource)}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors duration-300">
                        {getTypeIcon(resource.type)}
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {resource.type}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2">
                      {resource.title}
                    </h4>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{resource.updated}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{resource.users} students</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            Cloud-based prototype for Senegalese students
          </p>
        </div>
      </footer>

      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedResource.title}</h2>
              <button
                onClick={() => setSelectedResource(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                  {getTypeIcon(selectedResource.type)}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Resource Type</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedResource.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedResource.updated}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Used by Students</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedResource.users}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  This resource is available for download. Click the button below to view or download the file.
                </p>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium">
                  <Eye className="w-5 h-5" />
                  <span>View Document</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium">
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">Document Preview</p>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Document preview will appear here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Upload Resource</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resource Title
                </label>
                <input
                  type="text"
                  value={uploadFormData.title}
                  onChange={(e) => setUploadFormData({ ...uploadFormData, title: e.target.value })}
                  placeholder="e.g., Cloud Architecture Basics"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course
                </label>
                <select
                  value={uploadFormData.course}
                  onChange={(e) => setUploadFormData({ ...uploadFormData, course: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-colors"
                >
                  <option value="CS401">Cloud Computing (CS401)</option>
                  <option value="CS302">Cybersecurity (CS302)</option>
                  <option value="CS101">Programming (CS101)</option>
                  <option value="CS201">Networking (CS201)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resource Type
                </label>
                <select
                  value={uploadFormData.type}
                  onChange={(e) => setUploadFormData({ ...uploadFormData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-colors"
                >
                  <option value="PDF">PDF Slides</option>
                  <option value="Notes">Lecture Notes</option>
                  <option value="Exam">Past Exam</option>
                </select>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, DOC, or DOCX up to 50MB</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
