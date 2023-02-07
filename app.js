const container = document.querySelector('.container')
const mass = ['a', 'b', 'c', 'd', 'e', 'f']
const itemArray = createRandomMass(mass)
console.log(itemArray)
let check = 0
let firstCardIndex = null
const finalMass = []
const body = document.querySelector('body')

const audio = new Audio() // Создаём новый элемент Audio
audio.src = 'dre.mp3' // Указываем путь к звуку "клика"

itemArray.forEach((elem, index) => {
    const item = document.createElement('div')
    finalMass.push(item)
    item.classList.add('item')
    container.append(item)
    item.addEventListener('click', () => {
        if (item.classList.contains('checked')) {
            return null
        }
        if (check == 0) {
            item.innerHTML = elem
            firstCardIndex = index
            check++
        } else if (check == 1 && index != firstCardIndex) {
            item.innerHTML = elem
            check++
            if (itemArray[index] == itemArray[firstCardIndex]) {
                item.classList.add('checked')
                finalMass[firstCardIndex].classList.add('checked')
                check = 0
                firstCardIndex = null
                checkWin()
            } else {
                setTimeout(() => {
                    item.innerHTML = ''
                    finalMass[firstCardIndex].innerHTML = ''
                    check = 0
                    firstCardIndex = null
                }, 1000)
            }
        }
    })
})

function createRandomMass(mass) {
    const randomMass = []

    for (const item of mass) {
        randomMass.push(item, item)
    }

    randomMass.sort(() => Math.random() - 0.5)

    return randomMass
}

function checkWin() {
    for (let i = 0; i < finalMass.length; i++) {
        if (!finalMass[i].classList.contains('checked')) {
            return false
        }
    }

    audio.play()
    body.innerHTML = '<img src="flexdog.gif">'
    body.innerHTML += '<button onclick = "location.reload()">Еще?</button>'
}
