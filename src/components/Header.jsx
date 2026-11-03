import NavLinks from "./NavLinks";


const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD",
        {
            dateStyle: "full",
        }
    )
    return (
    <header>
            <div className="flex ml-30 gap-2">
            <div  className="bg-green-700 p-2 rounded-xl">🛒</div> 
           <div >
             <div className="font-bold text-2xl">বাজার দর</div>
            <div>{date}</div>
           </div>
        </div>
 <NavLinks/>
    </header>
     
    );
};

export default Header;