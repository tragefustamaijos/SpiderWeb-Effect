var canvas = document.createElement("canvas");
document.body.insertBefore(canvas, document.body.firstChild)
canvas.style.backgroundColor = "black"
canvas.width = innerWidth
canvas.height = innerHeight
const c = canvas.getContext("2d")

let hue = 0;
const particle_array = []

const mouse = 
{
    x: undefined,
    y: undefined
}

canvas.addEventListener("mousemove", function(event)
{
    mouse.x = event.x;
    mouse.y = event.y
    for(let i =0; i<3; i++)
        particle_array.push(new Particle());
})

canvas.addEventListener("click", function(event)
{
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i =0; i<15; i++)
        particle_array.push(new Particle());
})

class Particle
{
    constructor()
    {
        this.x = mouse.x
        this.y = mouse.y
        this.radius = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ',100%, 70%)';
    }

    update()
    {
        this.x += this.speedX
        this.y += this.speedY
        if(this.radius > 0.2)
            this.radius -= 0.1;
    }

    draw()
    {
        c.fillStyle = this.color
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c.fill();
    }
}

function handle_particles()
{
    for(let i=0; i<particle_array.length; i++)
    {
        let particle = particle_array[i];
        particle.update();
        particle.draw();

        for(let j=i; j<particle_array.length; j++)
        {
            const dx = particle_array[i].x - particle_array[j].x;
            const dy = particle_array[i].y - particle_array[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy)

            if(distance < 100)
            {
                c.strokeStyle = particle.color
                c.lineWidth = 0.2
                c.beginPath();
                c.moveTo(particle.x, particle.y)
                c.lineTo(particle_array[j].x, particle_array[j].y)
                c.stroke();
            }
        }

        if(particle.radius <= 0.3)
            {
                particle_array.splice(i, 1)
                i--;
            }
   }
}

function animate()
{
    requestAnimationFrame(animate);
    //c.clearRect(0, 0, innerWidth, innerHeight)
     c.fillStyle = 'rgba(0, 0, 0, 0.2)';
     c.fillRect(0, 0, canvas.width, canvas.height)
    handle_particles();
    hue+=5
}

animate()