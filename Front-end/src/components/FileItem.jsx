import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, Trash2, File, Image, Video, Music, Archive, 
  FileText, Code, Pdf, MoreVertical, Eye, Share2,
  Calendar, Clock
} from 'lucide-react'

function FileItem({ file, index, onDelete }) {
  const [showMenu, setShowMenu] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const getFileIcon = (type, name) => {
    const iconProps = { className: "w-7 h-7" }
    
    if (type.startsWith('image/')) return <Image {...iconProps} className="w-7 h-7 text-green-400" />
    if (type.startsWith('video/')) return <Video {...iconProps} className="w-7 h-7 text-red-400" />
    if (type.startsWith('audio/')) return <Music {...iconProps} className="w-7 h-7 text-purple-400" />
    if (type.includes('pdf')) return <Pdf {...iconProps} className="w-7 h-7 text-red-500" />
    if (type.includes('zip') || type.includes('rar') || type.includes('tar')) 
      return <Archive {...iconProps} className="w-7 h-7 text-yellow-400" />
    if (type.includes('text') || name.endsWith('.txt') || name.endsWith('.md')) 
      return <FileText {...iconProps} className="w-7 h-7 text-blue-400" />
    if (name.match(/\.(js|jsx|ts|tsx|py|java|cpp|c|html|css|json)$/)) 
      return <Code {...iconProps} className="w-7 h-7 text-cyan-400" />
    
    return <File {...iconProps} className="w-7 h-7 text-gray-400" />
  }

  const getFileSize = (data) => {
    const bytes = data.length
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileType = (type, name) => {
    if (type.startsWith('image/')) return 'Image'
    if (type.startsWith('video/')) return 'Video'
    if (type.startsWith('audio/')) return 'Audio'
    if (type.includes('pdf')) return 'PDF'
    if (type.includes('zip') || type.includes('rar')) return 'Archive'
    if (type.includes('text')) return 'Text'
    const ext = name.split('.').pop()?.toUpperCase()
    return ext || 'File'
  }

  const handleDownload = () => {
    const blob = new Blob([Uint8Array.from(file.data)], { type: file.type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = file.name
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await new Promise(resolve => setTimeout(resolve, 500)) // Smooth animation
    onDelete()
  }

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: isDeleting ? 0 : 1, 
        y: isDeleting ? -20 : 0,
        scale: isDeleting ? 0.95 : 1
      }}
      transition={{ 
        delay: index * 0.05,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="file-item group relative"
      onMouseLeave={() => setShowMenu(false)}
    >
      {/* File Icon and Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1 min-w-0">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex items-center justify-center w-14 h-14 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 flex-shrink-0"
          >
            {getFileIcon(file.type, file.name)}
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-lg truncate mb-1" title={file.name}>
              {file.name}
            </h3>
            <div className="flex items-center gap-3 text-white/60 text-sm mb-2">
              <span className="font-medium">{getFileSize(file.data)}</span>
              <span>•</span>
              <span>{getFileType(file.type, file.name)}</span>
            </div>
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <Calendar className="w-3 h-3" />
              <span>Added {formatDate()}</span>
            </div>
          </div>
        </div>

        {/* Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowMenu(!showMenu)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-lg"
        >
          <MoreVertical className="w-4 h-4 text-white/70" />
        </motion.button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-300 transition-colors text-sm font-medium"
            title="Download"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 transition-colors text-sm font-medium"
            title="Preview"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
          disabled={isDeleting}
          className="opacity-0 group-hover:opacity-100 transition-opacity btn-danger flex items-center gap-2 disabled:opacity-50"
          title="Delete"
        >
          {isDeleting ? (
            <div className="loading-spinner w-3 h-3" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-12 right-0 z-50 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-2 min-w-[160px] shadow-xl"
          >
            <button className="w-full flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors text-sm">
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button 
              onClick={handleDownload}
              className="w-full flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors text-sm">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <hr className="my-2 border-white/20" />
            <button 
              onClick={handleDelete}
              className="w-full flex items-center gap-3 px-3 py-2 text-red-300 hover:bg-red-500/20 rounded-lg transition-colors text-sm"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}

export default FileItem