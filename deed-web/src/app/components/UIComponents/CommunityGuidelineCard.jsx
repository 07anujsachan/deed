const CommunityGuidelineCard = ({ icon, title, description }) => {
  return (
    <div className="flex gap-4 items-start bg-gray-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white flex items-center justify-center text-lg shadow">
        <img src={icon} alt="icon" className="w-full h-full object-cover"/>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 text-base">
          {title}
        </h4>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CommunityGuidelineCard;
