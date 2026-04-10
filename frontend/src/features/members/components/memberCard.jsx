const MemberCard = ({member, isAdmin}) =>{
    return(
        <div>
            <span>{member.name}</span>
            {isAdmin && (<span>(Admin)</span>)}
        </div>
    );
};

export default MemberCard;