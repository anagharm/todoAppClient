export const COLUMNS_USER =[
    {
        Header              : 'User Code',
        accessor            : 'userCode',
        Cell                : e=><div className="text-center"><a href={'/admin/user/view/'+e.value}> {e.value} </a></div>
    },
    {
        Header              : 'User Name',
        accessor            : 'fullName'
    },
    {
        Header              : 'Email',
        accessor            : 'emailId'
    },
    {
        Header              : 'Role',
        accessor            : 'role',
        Cell                : e=><div className="text-center"> {e.value} </div>
    },
]