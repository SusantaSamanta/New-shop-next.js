import { PrismaClient } from "@prisma/client";

/// /api/sign-up
export async function POST(request: Request) {
    // console.log(await request.json());
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
        return Response.json({ success: false, message: "All field require" }, { status: 401 });
    }
    try {
        const prisma = new PrismaClient();
        const userExist = await prisma.users.findUnique({
            where: {
                email,
                // isVerified: true
            }
        });

        // const hashPassword = await bcrypt.hash(password, 10);
        const hashPassword = password;
        const expireAt = new Date();
        expireAt.setHours(expireAt.getHours() + 1);
        const verificationOtp = Math.floor(100000 + Math.random() * 900000).toString();

        if (userExist) {
            if (userExist?.isVerified) {
                return Response.json({ success: false, message: "An user in this email already exist." }, { status: 401 });
            }
            else {
                const updateUser = await prisma.users.update({ 
                    where: {
                        email
                    },
                    data: {
                        name,
                        password,
                        verificationOtp,
                        verifyCodeExpire: expireAt.toISOString(),
                    }
                });
            }
        }
        else{
            const newUser = await prisma.users.create({
                data: {
                    name,
                    email,
                    password,
                    verificationOtp,
                    verifyCodeExpire: expireAt.toISOString(),
                }
            });
        }


        console.log("Verification Code : ", verificationOtp);

        return Response.json(
            { success: true, message: "Registration successful verification mail send" },
            { status: 201 }
        );

    } catch (error) {
        console.log("Signup error", error);
        return Response.json({ success: false, message: "Signup error" }, { status: 401 });
    }
}

/// fresh_next=# update users set "isVerified" = true where email='susantasamanta0708@gmail.com';




