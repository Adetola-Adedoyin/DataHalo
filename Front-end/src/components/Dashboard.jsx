import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  HardDrive, FolderOpen, Image, Video, Music, FileText, 
  Archive, Upload, LogOut, Moon, Sun, Download, Trash2 
} from 'lucide-react'
import { saveFile, getFiles, deleteFile } from '../utils/storage'

function Dashboard({ user, onLogout }) {
  const [files, setFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    const fileList = await getFiles()
    setFiles(fileList)
  }

  const handleFileUpload = async (fileList) => {
    for (const file of fileList) {
      await saveFile(file)
    }
    loadFiles()
  }

  const handleFileDelete = async (filename) => {
    await deleteFile(filename)
    loadFiles()
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(Array.from(e.dataTransfer.files))
    }
  }

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDownload = (file) => {
    const blob = new Blob([Uint8Array.from(file.data)], { type: file.type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = file.name
    a.click()
    URL.revokeObjectURL(url)
  }

  const getFileType = (file) => {
    if (file.type.startsWith('image/')) return 'image'
    if (file.type.startsWith('video/')) return 'video'
    if (file.type.startsWith('audio/')) return 'audio'
    if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('text')) return 'document'
    if (file.type.includes('zip') || file.type.includes('rar')) return 'archive'
    return 'other'
  }

  const getFileIcon = (type) => {
    const iconProps = { size: 20, className: "text-white" }
    const icons = {
      image: <Image {...iconProps} />,
      video: <Video {...iconProps} />,
      audio: <Music {...iconProps} />,
      document: <FileText {...iconProps} />,
      archive: <Archive {...iconProps} />,
      other: <FolderOpen {...iconProps} />
    }
    return icons[type] || <FolderOpen {...iconProps} />
  }

  const getFileStats = () => {
    const stats = {
      image: { count: 0, size: 0 },
      video: { count: 0, size: 0 },
      audio: { count: 0, size: 0 },
      document: { count: 0, size: 0 },
      archive: { count: 0, size: 0 },
      other: { count: 0, size: 0 }
    }

    files.forEach(file => {
      const type = getFileType(file)
      stats[type].count++
      stats[type].size += file.data.length
    })

    return stats
  }

  const totalStorage = files.reduce((total, file) => total + file.data.length, 0)
  const maxStorage = 5 * 1024 * 1024 * 1024
  const storagePercentage = (totalStorage / maxStorage) * 100

  const fileStats = getFileStats()
  const firstName = user.username.split(' ')[0]

  return (
    <div className={`dashboard ${darkMode ? 'dark' : ''}`}>
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="dashboard-header"
      >
        <h1 className="dashboard-title">DataHalo Drive</h1>
        <div className="dashboard-user">
          <div className="user-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>
          <span>Welcome, {firstName}</span>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="btn-icon"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={onLogout} className="btn-secondary">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="dashboard-content"
      >
        <div className="stats-grid">
          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="stat-card"
          >
            <div className="stat-header">
              <div>
                <div className="stat-title">Total Storage</div>
                <div className="stat-value">{formatBytes(totalStorage)}</div>
                <div className="stat-label">of {formatBytes(maxStorage)} used</div>
              </div>
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="stat-icon" 
                style={{background: '#667eea'}}
              >
                <HardDrive size={20} className="text-white" />
              </motion.div>
            </div>
            <div className="storage-bar">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(storagePercentage, 100)}%` }}
                transition={{ delay: 0.5, duration: 1 }}
                className="storage-fill" 
              />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="stat-card"
          >
            <div className="stat-header">
              <div>
                <div className="stat-title">Total Files</div>
                <div className="stat-value">{files.length}</div>
                <div className="stat-label">files stored</div>
              </div>
              <motion.div 
                whileHover={{ scale: 1.2, rotate: -10 }}
                className="stat-icon" 
                style={{background: '#10b981'}}
              >
                <FolderOpen size={20} className="text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="stat-card"
          >
            <div className="stat-header">
              <div>
                <div className="stat-title">Images</div>
                <div className="stat-value">{fileStats.image.count}</div>
                <div className="stat-label">{formatBytes(fileStats.image.size)}</div>
              </div>
              <motion.div 
                whileHover={{ scale: 1.2, y: -5 }}
                className="stat-icon" 
                style={{background: '#f59e0b'}}
              >
                <Image size={20} className="text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="stat-card"
          >
            <div className="stat-header">
              <div>
                <div className="stat-title">Videos</div>
                <div className="stat-value">{fileStats.video.count}</div>
                <div className="stat-label">{formatBytes(fileStats.video.size)}</div>
              </div>
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 15 }}
                className="stat-icon" 
                style={{background: '#ef4444'}}
              >
                <Video size={20} className="text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="stat-card"
          >
            <div className="stat-header">
              <div>
                <div className="stat-title">Audio</div>
                <div className="stat-value">{fileStats.audio.count}</div>
                <div className="stat-label">{formatBytes(fileStats.audio.size)}</div>
              </div>
              <motion.div 
                whileHover={{ scale: 1.2, rotate: -15 }}
                className="stat-icon" 
                style={{background: '#8b5cf6'}}
              >
                <Music size={20} className="text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="stat-card"
          >
            <div className="stat-header">
              <div>
                <div className="stat-title">Documents</div>
                <div className="stat-value">{fileStats.document.count}</div>
                <div className="stat-label">{formatBytes(fileStats.document.size)}</div>
              </div>
              <motion.div 
                whileHover={{ scale: 1.2, y: -8 }}
                className="stat-icon" 
                style={{background: '#3b82f6'}}
              >
                <FileText size={20} className="text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`upload-section ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            onChange={(e) => handleFileUpload(Array.from(e.target.files))}
            style={{display: 'none'}}
            id="file-upload"
          />
          <motion.div 
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="upload-icon"
          >
            <Upload size={32} className="text-blue-500" />
          </motion.div>
          <h3 className="upload-title">Upload Files</h3>
          <p className="upload-subtitle">
            Drag and drop files here, or click to browse
          </p>
          <label htmlFor="file-upload" className="btn-upload">
            Choose Files
          </label>
        </motion.div>

        <div className="files-section">
          <div className="files-header">
            <h2 className="files-title">Recent Files</h2>
            <span>{files.length} files</span>
          </div>
          
          {files.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📁</div>
              <h3>No files yet</h3>
              <p>Upload your first file to get started</p>
            </div>
          ) : (
            <div className="files-grid">
              {files.map((file, index) => {
                const fileType = getFileType(file)
                return (
                  <motion.div 
                    key={file.name} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.08, y: -12 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="file-item"
                  >
                    <div className={`file-icon file-${fileType}`}>
                      {getFileIcon(fileType)}
                    </div>
                    <div className="file-name">{file.name}</div>
                    <div className="file-size">{formatBytes(file.data.length)}</div>
                    <div className="file-actions">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDownload(file)}
                        className="btn-small btn-download"
                      >
                        <Download size={14} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleFileDelete(file.name)}
                        className="btn-small btn-delete"
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard