import { motion } from 'framer-motion';

const Loading = ({ type = 'cards', count = 6 }) => {
  const renderSkeletonCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-card"
        >
          <div className="aspect-video bg-gray-200 rounded-lg shimmer mb-4"></div>
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded shimmer"></div>
            <div className="h-4 bg-gray-200 rounded shimmer w-3/4"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded shimmer w-20"></div>
              <div className="h-8 bg-gray-200 rounded-full shimmer w-16"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderSkeletonStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded-lg shimmer"></div>
            <div className="w-12 h-6 bg-gray-200 rounded shimmer"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded shimmer mb-2"></div>
          <div className="h-4 bg-gray-200 rounded shimmer w-24"></div>
        </motion.div>
      ))}
    </div>
  );

  const renderSkeletonList = () => (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-xl p-6 shadow-card"
        >
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-lg shimmer flex-shrink-0"></div>
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gray-200 rounded shimmer"></div>
              <div className="h-4 bg-gray-200 rounded shimmer w-3/4"></div>
              <div className="flex items-center gap-4">
                <div className="h-4 bg-gray-200 rounded shimmer w-16"></div>
                <div className="h-4 bg-gray-200 rounded shimmer w-12"></div>
                <div className="h-4 bg-gray-200 rounded shimmer w-20"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-lg shimmer"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-lg shimmer"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderSkeletonForm = () => (
    <div className="bg-white rounded-xl p-8 shadow-card">
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded shimmer w-48 mb-8"></div>
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="h-4 bg-gray-200 rounded shimmer w-24"></div>
            <div className="h-12 bg-gray-200 rounded-lg shimmer"></div>
          </motion.div>
        ))}
        <div className="flex gap-4 pt-4">
          <div className="h-12 bg-gray-200 rounded-lg shimmer w-32"></div>
          <div className="h-12 bg-gray-200 rounded-lg shimmer w-24"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      {type === 'cards' && renderSkeletonCards()}
      {type === 'stats' && renderSkeletonStats()}
      {type === 'list' && renderSkeletonList()}
      {type === 'form' && renderSkeletonForm()}
      {type === 'dashboard' && (
        <>
          {renderSkeletonStats()}
          {renderSkeletonCards()}
        </>
      )}
    </div>
  );
};

export default Loading;